import React, { useMemo } from 'react';
import useGitHubStats from '../hooks/useGitHubStats';

/**
 * ContributionHeatmap — 52-week GitHub contribution calendar.
 * Renders as an SVG grid styled to match the terminal/dark theme.
 * Horizontally scrollable on mobile.
 */

// Color levels: 0 = no activity, 4+ = max
const COLORS = [
    'rgba(42, 45, 51, 0.8)',     // 0 — bg-panel-ish
    'rgba(67, 217, 173, 0.2)',   // 1
    'rgba(67, 217, 173, 0.45)',  // 2
    'rgba(67, 217, 173, 0.7)',   // 3
    'rgba(67, 217, 173, 1.0)',   // 4+
];

const CELL = 11;   // cell size px
const GAP = 2;     // gap between cells px
const STEP = CELL + GAP;

const getLevel = (count) => {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 9) return 3;
    return 4;
};

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const HeatmapSkeleton = () => (
    <div className="flex gap-[2px] overflow-x-auto pb-2">
        {Array.from({ length: 52 }).map((_, wi) => (
            <div key={wi} className="flex flex-col gap-[2px]">
                {Array.from({ length: 7 }).map((_, di) => (
                    <div
                        key={di}
                        className="rounded-sm animate-pulse"
                        style={{
                            width: CELL, height: CELL,
                            background: 'var(--border-light)',
                        }}
                    />
                ))}
            </div>
        ))}
    </div>
);

const ContributionHeatmap = () => {
    const { data, loading, error } = useGitHubStats();

    const { svgWidth, svgHeight, cells, monthMarkers } = useMemo(() => {
        if (!data?.contributionWeeks) return {};

        const weeks = data.contributionWeeks;
        const numWeeks = weeks.length;
        const svgWidth = numWeeks * STEP;
        const svgHeight = 7 * STEP + 20; // +20 for month labels on top

        const cells = [];
        const seenMonths = new Set();
        const monthMarkers = [];

        weeks.forEach((week, wi) => {
            week.days.forEach((day) => {
                cells.push({
                    x: wi * STEP,
                    y: day.weekday * STEP + 20,
                    color: COLORS[getLevel(day.count)],
                    count: day.count,
                    date: day.date,
                });

                // Month label — first week where a new month starts
                if (day.weekday === 0 && day.date) {
                    const month = new Date(day.date).getMonth();
                    if (!seenMonths.has(month)) {
                        seenMonths.add(month);
                        monthMarkers.push({ x: wi * STEP, label: MONTH_LABELS[month] });
                    }
                }
            });
        });

        return { svgWidth, svgHeight, cells, monthMarkers };
    }, [data]);

    if (error) return null;

    return (
        <div className="mt-8 mb-2">
            <p className="text-[0.7rem] uppercase tracking-[0.15em] mb-3"
                style={{ color: 'var(--accent-blue)' }}>
                // contribution_activity
            </p>

            {loading ? (
                <HeatmapSkeleton />
            ) : data?.contributionWeeks ? (
                <div className="overflow-x-auto pb-2">
                    <svg
                        width={svgWidth}
                        height={svgHeight}
                        style={{ display: 'block' }}
                    >
                        {/* Month labels */}
                        {monthMarkers.map((m) => (
                            <text
                                key={m.label + m.x}
                                x={m.x}
                                y={12}
                                fontSize={9}
                                fill="var(--text-secondary)"
                                opacity={0.5}
                                fontFamily="'JetBrains Mono', monospace"
                            >
                                {m.label}
                            </text>
                        ))}

                        {/* Cells */}
                        {cells.map((cell, i) => (
                            <rect
                                key={i}
                                x={cell.x}
                                y={cell.y}
                                width={CELL}
                                height={CELL}
                                rx={1}
                                fill={cell.color}
                            >
                                <title>{`${cell.date}: ${cell.count} contribution${cell.count !== 1 ? 's' : ''}`}</title>
                            </rect>
                        ))}
                    </svg>

                    {/* Legend */}
                    <div className="flex items-center gap-1.5 mt-2">
                        <span className="text-[0.6rem]" style={{ color: 'var(--text-secondary)', opacity: 0.5 }}>
                            less
                        </span>
                        {COLORS.map((c, i) => (
                            <div
                                key={i}
                                style={{
                                    width: CELL, height: CELL,
                                    background: c,
                                    borderRadius: 1,
                                }}
                            />
                        ))}
                        <span className="text-[0.6rem]" style={{ color: 'var(--text-secondary)', opacity: 0.5 }}>
                            more
                        </span>
                        <span
                            className="ml-3 text-[0.6rem] font-mono"
                            style={{ color: 'var(--text-secondary)', opacity: 0.4 }}
                        >
                            {data.totalContributions} contributions this year
                        </span>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default ContributionHeatmap;
