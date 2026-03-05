import { useState, useEffect, useRef } from 'react';

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
    const mounted = useRef(true);

    useEffect(() => {
        mounted.current = true;
        if (cachedData) {
            setData(cachedData);
            setLoading(false);
            return;
        }

        fetchGitHubStats()
            .then(d => {
                if (mounted.current) {
                    setData(d);
                    setLoading(false);
                }
            })
            .catch(err => {
                if (mounted.current) {
                    setError(err.message);
                    setLoading(false);
                }
            });

        return () => { mounted.current = false; };
    }, []);

    return { data, loading, error };
};

export default useGitHubStats;
