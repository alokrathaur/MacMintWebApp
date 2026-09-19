import React, { useState } from "react";

interface TimeSeriesItem {
  bucket: string;
  label: string;
  visitors: number;
  pageviews: number;
  downloads: number;
}

interface BarTimeSeriesProps {
  title: string;
  data: TimeSeriesItem[];
  granularity: "hourly" | "daily" | "monthly";
}

export const BarTimeSeries: React.FC<BarTimeSeriesProps> = ({
  title,
  data,
  granularity,
}) => {
  const [activeMetric, setActiveMetric] = useState<"visitors" | "pageviews">("visitors");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200/90 dark:border-mint-900/30 bg-white/80 dark:bg-surface-darkCard/80 p-6 flex items-center justify-center text-sm text-slate-400">
        No traffic data available
      </div>
    );
  }

  const values = data.map((d) => (activeMetric === "visitors" ? d.visitors : d.pageviews));
  const maxValue = Math.max(1, ...values);
  const totalMetric = values.reduce((s, v) => s + v, 0);

  // SVG dimensions
  const height = 240;
  const paddingBottom = 28;
  const paddingTop = 16;
  const chartHeight = height - paddingTop - paddingBottom;

  const hoveredItem = hoveredIndex !== null ? data[hoveredIndex] : null;

  return (
    <div className="rounded-2xl border border-slate-200/90 dark:border-mint-900/30 bg-white/80 dark:bg-surface-darkCard/80 backdrop-blur-sm p-4 sm:p-6 shadow-sm">
      {/* Header with Title & Metric Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </h3>
          <div className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">
            {totalMetric.toLocaleString()}{" "}
            <span className="text-xs font-normal text-slate-500 dark:text-slate-400 lowercase">
              {activeMetric} in this period
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-surface-darkSurface border border-slate-200/60 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setActiveMetric("visitors")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              activeMetric === "visitors"
                ? "bg-white dark:bg-surface-darkCard text-mint-600 dark:text-mint-400 shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            Visitors
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric("pageviews")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
              activeMetric === "pageviews"
                ? "bg-white dark:bg-surface-darkCard text-mint-600 dark:text-mint-400 shadow-xs"
                : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            Pageviews
          </button>
        </div>
      </div>

      {/* Interactive Tooltip Card */}
      <div className="h-9 mb-2 flex items-center justify-between text-xs px-2 rounded-lg bg-slate-50 dark:bg-surface-darkSurface/60 border border-slate-100 dark:border-slate-800/60">
        {hoveredItem ? (
          <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300 font-medium">
            <span className="font-bold text-mint-600 dark:text-mint-400">{hoveredItem.label}</span>
            <span>
              Visitors:{" "}
              <strong className="text-slate-900 dark:text-white font-mono">
                {hoveredItem.visitors.toLocaleString()}
              </strong>
            </span>
            <span>
              Views:{" "}
              <strong className="text-slate-900 dark:text-white font-mono">
                {hoveredItem.pageviews.toLocaleString()}
              </strong>
            </span>
            <span>
              DMG Downloads:{" "}
              <strong className="text-slate-900 dark:text-white font-mono">
                {hoveredItem.downloads.toLocaleString()}
              </strong>
            </span>
          </div>
        ) : (
          <span className="text-slate-400 dark:text-slate-500 italic">
            Hover over any bar to inspect time bucket details
          </span>
        )}
      </div>

      {/* SVG Chart */}
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${data.length * 28} ${height}`}
          className="w-full h-48 sm:h-56 overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="mintBarGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B92F5" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#1D74E0" stopOpacity="0.65" />
            </linearGradient>
            <linearGradient id="mintHoverGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5AA9F8" stopOpacity="1" />
              <stop offset="100%" stopColor="#0B58BE" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line
            x1="0"
            y1={paddingTop}
            x2={data.length * 28}
            y2={paddingTop}
            stroke="currentColor"
            className="text-slate-200 dark:text-slate-800"
            strokeDasharray="4 4"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1={paddingTop + chartHeight / 2}
            x2={data.length * 28}
            y2={paddingTop + chartHeight / 2}
            stroke="currentColor"
            className="text-slate-200 dark:text-slate-800"
            strokeDasharray="4 4"
            strokeWidth="1"
          />
          <line
            x1="0"
            y1={height - paddingBottom}
            x2={data.length * 28}
            y2={height - paddingBottom}
            stroke="currentColor"
            className="text-slate-300 dark:text-slate-700"
            strokeWidth="1"
          />

          {/* Bars */}
          {data.map((item, idx) => {
            const val = activeMetric === "visitors" ? item.visitors : item.pageviews;
            const barHeight = Math.max(4, (val / maxValue) * chartHeight);
            const x = idx * 28 + 4;
            const y = height - paddingBottom - barHeight;
            const isHovered = hoveredIndex === idx;

            // X-axis label display frequency
            const showLabel =
              data.length <= 12
                ? true
                : data.length <= 24
                ? idx % 3 === 0
                : idx % 5 === 0 || idx === data.length - 1;

            return (
              <g
                key={item.bucket}
                className="cursor-pointer transition-opacity"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Bar */}
                <rect
                  x={x}
                  y={y}
                  width="20"
                  height={barHeight}
                  rx="4"
                  fill={isHovered ? "url(#mintHoverGradient)" : "url(#mintBarGradient)"}
                  className="transition-all duration-150"
                />

                {/* X-axis Label */}
                {showLabel && (
                  <text
                    x={x + 10}
                    y={height - 8}
                    textAnchor="middle"
                    className="text-[10px] fill-slate-400 dark:fill-slate-500 font-mono select-none"
                  >
                    {item.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
