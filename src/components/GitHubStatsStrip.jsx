import React from 'react';
import useGitHubStats from '../hooks/useGitHubStats';

/**
 * GitHubStatsStrip — compact live stats row for the Home hero.
 * Shows: commits this year, streak, public repos, total stars.
 * Silently hides on error (no broken UI).
 */

const Skeleton = () => (
    <div className="flex items-center gap-6 flex-wrap">
        {[80, 100, 70, 60].map((w, i) => (
            <div
                key={i}
                className="h-3 rounded animate-pulse"
                style={{
                    width: `${w}px`,
                    background: 'var(--border-light)',
                }}
            />
        ))}
    </div>
);

const Stat = ({ value, label, icon }) => (
    <span className="flex items-center gap-1.5">
        <span style={{ color: 'var(--accent-success)' }} className="text-xs">{icon}</span>
        <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
            {value}
        </span>
        <span className="text-[0.65rem]" style={{ color: 'var(--text-secondary)' }}>
            {label}
        </span>
    </span>
);

const GitHubStatsStrip = () => {
    const { data, loading, error } = useGitHubStats();

    // Silently hide on error
    if (error) return null;

    return (
        <div className="font-mono py-2">
            {loading ? (
                <Skeleton />
            ) : data ? (
                <div className="flex items-center gap-x-6 gap-y-1.5 flex-wrap">
                    <Stat
                        icon="↑"
                        value={data.totalCommitsThisYear.toLocaleString()}
                        label="commits"
                    />
                    <Stat
                        icon="🔥"
                        value={`${data.streak}d`}
                        label="streak"
                    />
                    <Stat
                        icon="⬡"
                        value={data.totalRepos}
                        label="repos"
                    />
                    <Stat
                        icon="★"
                        value={data.totalStars}
                        label="stars"
                    />
                </div>
            ) : null}
        </div>
    );
};

export default GitHubStatsStrip;
