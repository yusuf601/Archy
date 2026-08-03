import React from 'react';

const SectionDivider = ({ title, kicker }) => (
    <div className="px-6 py-20 md:py-28">
        <div className="mx-auto max-w-6xl border-t border-[var(--border-light)] pt-8 md:pt-10">
            {kicker && (
                <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--accent-info)]">
                    {kicker}
                </p>
            )}
            <h2
                className="font-display max-w-4xl text-3xl font-black leading-tight tracking-tight text-[var(--text-primary)] md:text-5xl"
            >
                {title}
            </h2>
        </div>
    </div>
);

export default SectionDivider;
