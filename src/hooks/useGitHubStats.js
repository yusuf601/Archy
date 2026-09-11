import { useState, useEffect } from 'react';

/**
 * Custom hook — fetches GitHub stats from our Netlify function.
 * Memoizes result for the browser session (no re-fetch on re-render).
 *
 * Returns: { data, loading, error }
 */

// Module-level cache so both GitHubStatsStrip and ContributionHeatmap
// share one fetch regardless of mount order.
let cachedData = null;
let fetchPromise = null;

const fetchGitHubStats = () => {
    if (fetchPromise) return fetchPromise;
    fetchPromise = fetch('/.netlify/functions/github-stats')
        .then(res => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(data => {
            cachedData = data;
            return data;
        })
        .catch(err => {
            fetchPromise = null; // allow retry on next mount
            throw err;
        });
    return fetchPromise;
};

const useGitHubStats = () => {
    const [data, setData] = useState(cachedData);
    const [loading, setLoading] = useState(!cachedData);
    const [error, setError] = useState(null);
    const [attempt, setAttempt] = useState(0);

    useEffect(() => {
        let active = true;
        setError(null);
        if (cachedData) {
            setData(cachedData);
            setLoading(false);
            return;
        }

        fetchGitHubStats()
            .then(d => {
                if (active) {
                    setData(d);
                    setLoading(false);
                }
            })
            .catch(err => {
                if (active) {
                    setError(err.message);
                    setLoading(false);
                }
            });

        return () => { active = false; };
    }, [attempt]);

    const retry = () => {
        setLoading(true);
        setError(null);
        setAttempt(value => value + 1);
    };
    return { data, loading, error, retry };
};

export default useGitHubStats;
