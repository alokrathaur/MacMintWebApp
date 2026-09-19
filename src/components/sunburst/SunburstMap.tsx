import React, { useState, useMemo } from "react";
import * as d3 from "d3";
import storageData from "@/data/storage-demo.json";
import { formatBytes } from "@/lib/utils";
import { RotateCcw, ArrowLeft, Info, Folder, LayoutGrid, PieChart } from "lucide-react";

interface NodeData {
  name: string;
  size?: number;
  formatted?: string;
  color?: string;
  children?: NodeData[];
}

const TREEMAP_PALETTE = [
  "#3B82F6", // Blue (Users / System)
  "#10B981", // Mint / Emerald Green (Applications)
  "#F97316", // Warm Orange (System Library)
  "#8B5CF6", // Purple / Lilac (private & var)
  "#EC4899", // Pink / Coral (Downloads)
  "#14B8A6", // Teal (usr & opt)
  "#06B6D4", // Cyan (.local)
  "#A855F7", // Lavender (Desktop)
  "#6366F1", // Indigo (Developer)
  "#EAB308", // Amber (WorkSpace)
];

export const SunburstMap: React.FC = () => {
  const [viewMode, setViewMode] = useState<"treemap" | "sunburst">("treemap");
  const [currentNode, setCurrentNode] = useState<NodeData>(storageData as NodeData);
  const [history, setHistory] = useState<NodeData[]>([]);
  const [hoveredNode, setHoveredNode] = useState<{
    name: string;
    size: number;
    percentage: string;
  } | null>(null);

  // Compute D3 Hierarchy & Partition layout for Sunburst Map
  // CRITICAL: sum only leaf nodes (no children) so directories are not double-counted!
  const { arcs, totalSize } = useMemo(() => {
    const root = d3
      .hierarchy(currentNode)
      .sum((d) => (d.children && d.children.length > 0 ? 0 : (d.size || 0)))
      .sort((a, b) => (b.value || 0) - (a.value || 0));

    const total = root.value || 1;

    // Partition layout: [x0, x1] is angle (0 to 2*PI), [y0, y1] is radius (inner to outer)
    const partition = d3.partition<NodeData>().size([2 * Math.PI, 1]);
    const partitionedRoot = partition(root);

    // Arcs for SVG rendering
    const radius = 180;
    const innerRadius = 55;

    const arcGen = d3
      .arc<d3.HierarchyRectangularNode<NodeData>>()
      .startAngle((d) => d.x0)
      .endAngle((d) => d.x1)
      .padAngle((d) => Math.min((d.x1 - d.x0) / 2, 0.008))
      .padRadius(radius / 2)
      .innerRadius((d) => innerRadius + d.y0 * (radius - innerRadius))
      .outerRadius((d) => Math.max(innerRadius, innerRadius + d.y1 * (radius - innerRadius) - 1));

    const computedArcs = partitionedRoot.descendants().slice(1).map((node) => {
      const percentage = (((node.value || 0) / total) * 100).toFixed(1) + "%";
      return {
        path: arcGen(node) || "",
        node,
        data: node.data,
        name: node.data.name,
        size: node.value || 0,
        percentage,
        color: node.data.color || (node.depth === 1 ? "#3B82F6" : node.depth === 2 ? "#6366F1" : "#8B5CF6"),
      };
    });

    return { arcs: computedArcs, totalSize: total };
  }, [currentNode]);

  // Compute D3 Squarified Treemap Layout
  // CRITICAL: sum only leaf nodes so directories are not double-counted!
  const treemapTiles = useMemo(() => {
    if (viewMode !== "treemap") return [];

    const root = d3
      .hierarchy(currentNode)
      .sum((d) => (d.children && d.children.length > 0 ? 0 : (d.size || 0)))
      .sort((a, b) => (b.value || 0) - (a.value || 0));

    const total = root.value || 1;

    const width = 440;
    const height = 360;

    const treemap = d3
      .treemap<NodeData>()
      .size([width, height])
      .paddingInner(3)
      .paddingOuter(0)
      .round(true);

    const treemapRoot = treemap(root);
    const children = treemapRoot.children || [];

    return children.map((node, idx) => {
      const percentage = (((node.value || 0) / total) * 100).toFixed(1) + "%";
      const w = Math.max(0, node.x1 - node.x0);
      const h = Math.max(0, node.y1 - node.y0);

      return {
        id: `${node.data.name}-${idx}`,
        name: node.data.name,
        size: node.value || 0,
        formatted: node.data.formatted || formatBytes(node.value || 0),
        percentage,
        color: node.data.color || TREEMAP_PALETTE[idx % TREEMAP_PALETTE.length],
        x: node.x0,
        y: node.y0,
        width: w,
        height: h,
        data: node.data,
        hasChildren: Boolean(node.data.children && node.data.children.length > 0),
      };
    });
  }, [currentNode, viewMode]);

  const handleDrillDown = (node: NodeData) => {
    if (node.children && node.children.length > 0) {
      setHistory((prev) => [...prev, currentNode]);
      setCurrentNode(node);
      setHoveredNode(null);
    }
  };

  const handleGoBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory((h) => h.slice(0, -1));
      setCurrentNode(prev);
      setHoveredNode(null);
    }
  };

  const handleReset = () => {
    setHistory([]);
    setCurrentNode(storageData as NodeData);
    setHoveredNode(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl bg-white dark:bg-surface-darkSurface border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-6 sm:p-8 transition-all">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-mint-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-mint-700 dark:text-mint-400">
              Interactive Storage Map
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-medium">
              Demo Dataset
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {viewMode === "treemap" ? "Treemap Storage Visualizer" : "Radial Storage Visualizer"}
          </h3>
        </div>

        {/* Toolbar buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Segmented View Mode Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-surface-darkCard border border-slate-200/80 dark:border-slate-800">
            <button
              type="button"
              onClick={() => {
                setViewMode("treemap");
                setHoveredNode(null);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === "treemap"
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-mint-600 dark:text-mint-400" />
              <span>Treemap</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setViewMode("sunburst");
                setHoveredNode(null);
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === "sunburst"
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <PieChart className="w-3.5 h-3.5 text-mint-600 dark:text-mint-400" />
              <span>Sunburst Map</span>
            </button>
          </div>

          {history.length > 0 && (
            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-surface-darkCard text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-surface-darkCard text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset View</span>
          </button>
        </div>
      </div>

      {/* Breadcrumb Path */}
      <div className="py-3 flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 overflow-x-auto whitespace-nowrap">
        <Folder className="w-3.5 h-3.5 text-mint-600 dark:text-mint-400 shrink-0" />
        <span
          onClick={handleReset}
          className="cursor-pointer hover:text-mint-600 transition font-medium"
        >
          Macintosh HD
        </span>
        {history.map((h, i) => (
          <React.Fragment key={i}>
            <span>/</span>
            <span className="text-slate-400">{h.name}</span>
          </React.Fragment>
        ))}
        {history.length > 0 && (
          <>
            <span>/</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {currentNode.name}
            </span>
          </>
        )}
      </div>

      {/* Visualizer Graphic & Ranked Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
        
        {/* Left Visualization: Treemap or Radial Chart */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
          {viewMode === "treemap" ? (
            <>
              {/* Squarified Treemap Container */}
              <div className="relative w-full max-w-[440px] h-[360px] rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-slate-100/70 dark:bg-surface-darkCard p-1 select-none shadow-inner">
                {treemapTiles.map((tile) => {
                  const isHovered = hoveredNode?.name === tile.name;
                  const showFullText = tile.width >= 70 && tile.height >= 44;
                  const showMediumText = tile.width >= 46 && tile.height >= 32 && !showFullText;
                  const showCompactText = !showFullText && !showMediumText;

                  return (
                    <div
                      key={tile.id}
                      onClick={() => tile.hasChildren && handleDrillDown(tile.data)}
                      onMouseEnter={() =>
                        setHoveredNode({
                          name: tile.name,
                          size: tile.size,
                          percentage: tile.percentage,
                        })
                      }
                      onMouseLeave={() => setHoveredNode(null)}
                      title={`${tile.name} — ${tile.formatted} (${tile.percentage})`}
                      style={{
                        position: "absolute",
                        left: `${(tile.x / 440) * 100}%`,
                        top: `${(tile.y / 360) * 100}%`,
                        width: `${(tile.width / 440) * 100}%`,
                        height: `${(tile.height / 360) * 100}%`,
                        padding: "2px",
                      }}
                      className="transition-all duration-150"
                    >
                      <div
                        style={{ backgroundColor: tile.color }}
                        className={`w-full h-full rounded-xl flex flex-col items-center justify-center text-center p-1.5 text-white shadow-sm transition-all duration-200 overflow-hidden ${
                          tile.hasChildren ? "cursor-pointer" : "cursor-default"
                        } ${
                          isHovered
                            ? "brightness-110 ring-2 ring-white/95 scale-[1.015] z-10 shadow-lg"
                            : "hover:brightness-105"
                        }`}
                      >
                        {showFullText && (
                          <>
                            <span className="text-xs font-bold truncate max-w-full px-1 drop-shadow-sm">
                              {tile.name}
                            </span>
                            <span className="text-[11px] font-semibold opacity-95 drop-shadow-sm mt-0.5">
                              {tile.formatted}
                            </span>
                            <span className="text-[10px] opacity-80 font-medium">
                              {tile.percentage}
                            </span>
                          </>
                        )}
                        {showMediumText && (
                          <>
                            <span className="text-[10px] font-bold leading-tight line-clamp-2 max-w-full px-0.5 drop-shadow-sm">
                              {tile.name}
                            </span>
                            <span className="text-[9px] font-semibold opacity-90 drop-shadow-sm mt-0.5">
                              {tile.formatted}
                            </span>
                          </>
                        )}
                        {showCompactText && (
                          <div className="flex flex-col items-center justify-center leading-none">
                            <span className="text-[9px] font-bold truncate max-w-full px-0.5 drop-shadow-sm">
                              {tile.name}
                            </span>
                            <span className="text-[8px] opacity-85 font-medium mt-0.5">
                              {tile.formatted}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-2 mt-3 text-xs text-slate-500 dark:text-slate-400">
                <Info className="w-3.5 h-3.5 text-mint-600 dark:text-mint-400 shrink-0" />
                <span>Click any folder tile to drill down · Sized proportionally by disk usage</span>
              </div>
            </>
          ) : (
            <>
              {/* SVG Radial Chart */}
              <div className="relative w-[360px] h-[360px] sm:w-[420px] sm:h-[420px] flex items-center justify-center">
                <svg
                  viewBox="-210 -210 420 420"
                  className="w-full h-full transform -rotate-90 select-none"
                >
                  {/* Slices */}
                  {arcs.map((arc, i) => (
                    <path
                      key={i}
                      d={arc.path}
                      fill={arc.color}
                      className="transition-all duration-200 cursor-pointer hover:opacity-90 hover:brightness-110"
                      style={{
                        stroke: "var(--tw-surface-light, #ffffff)",
                        strokeWidth: 1.5,
                      }}
                      onMouseEnter={() =>
                        setHoveredNode({
                          name: arc.name,
                          size: arc.size,
                          percentage: arc.percentage,
                        })
                      }
                      onMouseLeave={() => setHoveredNode(null)}
                      onClick={() => handleDrillDown(arc.data)}
                    />
                  ))}

                  {/* Center Disk Node */}
                  <circle
                    r={52}
                    fill="#ffffff"
                    className="dark:fill-[#0D1C19] cursor-pointer"
                    onClick={handleGoBack}
                    style={{
                      filter: "drop-shadow(0 2px 8px rgba(8, 127, 115, 0.15))",
                    }}
                  />
                </svg>

                {/* Center Live Details Overlay */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4"
                  style={{ maxWidth: 120, margin: "auto" }}
                >
                  {hoveredNode ? (
                    <>
                      <span className="text-[11px] font-bold text-slate-800 dark:text-slate-100 truncate w-full">
                        {hoveredNode.name}
                      </span>
                      <span className="text-xs font-bold text-mint-600 dark:text-mint-400">
                        {formatBytes(hoveredNode.size)}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {hoveredNode.percentage}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 truncate w-full">
                        {currentNode.name}
                      </span>
                      <span className="text-xs font-bold text-mint-600 dark:text-mint-400">
                        {formatBytes(totalSize)}
                      </span>
                      <span className="text-[9px] text-slate-400 uppercase tracking-tighter">
                        Click slice to zoom
                      </span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-6 mt-2 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-mint-600" />
                  <span>Inner Ring: Top Folders</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-mint-400" />
                  <span>Outer Ring: Sub-Directories</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Details: Ranked Directory Breakdown */}
        <div className="lg:col-span-5 flex flex-col space-y-3">
          <div className="flex items-center justify-between pb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Storage Ranked · {currentNode.children?.length || 0} items
            </span>
            <span className="text-xs text-mint-600 font-medium">
              Total {formatBytes(totalSize)}
            </span>
          </div>

          <div className="space-y-2 max-h-[390px] overflow-y-auto pr-1">
            {(currentNode.children || []).map((child, idx) => {
              const childSize = child.size || 0;
              const pct = (((childSize) / totalSize) * 100).toFixed(1);
              const isDrillable = child.children && child.children.length > 0;
              const isHovered = hoveredNode?.name === child.name;

              return (
                <div
                  key={idx}
                  onClick={() => isDrillable && handleDrillDown(child)}
                  onMouseEnter={() =>
                    setHoveredNode({
                      name: child.name,
                      size: childSize,
                      percentage: `${pct}%`,
                    })
                  }
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                    isHovered
                      ? "border-mint-500 bg-mint-50/70 dark:bg-mint-950/30 shadow-sm"
                      : "border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-surface-darkCard hover:border-mint-400/50"
                  } ${isDrillable ? "cursor-pointer hover:bg-mint-50/50 dark:hover:bg-mint-950/20" : ""}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: child.color || TREEMAP_PALETTE[idx % TREEMAP_PALETTE.length] }}
                    />
                    <div className="truncate">
                      <div className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate">
                        {child.name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {pct}% of {currentNode.name}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-3">
                    <div className="text-xs font-bold font-mono text-slate-900 dark:text-white">
                      {child.formatted || formatBytes(childSize)}
                    </div>
                    {isDrillable && (
                      <span className="text-[10px] text-mint-600 dark:text-mint-400 font-medium">
                        Drill Down →
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
