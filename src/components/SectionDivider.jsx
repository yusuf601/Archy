import React from 'react';

/**
 * SectionDivider — visual chapter break between page sections.
 * Renders a full-width line with a centered label: `// ──── [label] ────`
 */
const SectionDivider = ({ label }) => (
    <div className="section-divider px-6">
        <span className="shrink-0 text-[var(--text-secondary)] opacity-40 font-mono">
            // ——&nbsp;[{label}]&nbsp;——
        </span>
    </div>
);

export default SectionDivider;
