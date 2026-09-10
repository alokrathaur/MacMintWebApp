import React, { useState, useMemo } from "react";
import * as d3 from "d3";
import storageData from "@/data/storage-demo.json";
import { formatBytes } from "@/lib/utils";
import { RotateCcw, ArrowLeft, ZoomIn, Info, Folder } from "lucide-react";

interface NodeData {
  name: string;
  size?: number;
  formatted?: string;
  color?: string;
  children?: NodeData[];
}

export const SunburstMap: React.FC = () => {
  const [currentNode, setCurrentNode] = useState<NodeData>(storageData as NodeData);
  const [history, setHistory] = useState<NodeData[]>([]);
  const [hoveredNode, setHoveredNode] = useState<{
    name: string;
    size: number;
    percentage: string;
  } | null>(null);

  // Compute D3 Hierarchy & Partition layout
  const { arcs, totalSize } = useMemo(() => {
    const root = d3
      .hierarchy(currentNode)
      .sum((d) => d.size || 0)
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
        color: node.data.color || (node.depth === 1 ? "#087F73" : node.depth === 2 ? "#23B99C" : "#4FD1B5"),
      };
    });

    return { arcs: computedArcs, totalSize: total };
  }, [currentNode]);

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
      {/* Sunburst Header & Controls */}
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
            Radial Storage Visualizer
          </h3>
        </div>

        {/* Toolbar buttons */}
        <div className="flex items-center gap-2">
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

      {/* Sunburst Graphic & Ranked Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
        
        {/* SVG Radial Chart */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
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

          <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
            {(currentNode.children || []).map((child, idx) => {
              const childSize = child.size || 0;
              const pct = (((childSize) / totalSize) * 100).toFixed(1);
              const isDrillable = child.children && child.children.length > 0;

              return (
                <div
                  key={idx}
                  onClick={() => isDrillable && handleDrillDown(child)}
                  className={`flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/70 dark:bg-surface-darkCard hover:border-mint-400/50 transition-all ${
                    isDrillable ? "cursor-pointer hover:bg-mint-50/50 dark:hover:bg-mint-950/20" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: child.color || "#087F73" }}
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

          <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400">
            <Info className="w-3.5 h-3.5 shrink-0 text-mint-500" />
            <span>Click any sector on the map or drill down on a row to explore nested directories.</span>
          </div>
        </div>

      </div>
    </div>
  );
};
