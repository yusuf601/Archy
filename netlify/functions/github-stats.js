/**
 * Netlify serverless function — GitHub Stats
 * GET /.netlify/functions/github-stats
 *
 * Fetches user stats (REST) + contribution heatmap (GraphQL).
 * Token stays server-side — never sent to the browser.
 * Response cached for 1 hour to stay within rate limits.
 */

const GITHUB_USERNAME = 'yusuf601';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const headers = {
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=3600',
    'Access-Control-Allow-Origin': '*',
};

export const handler = async () => {
    if (!GITHUB_TOKEN) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'GITHUB_TOKEN not configured' }),
        };
    }

    const authHeaders = {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
    };

    try {
        // ── 1. REST: user profile stats ──────────────────────────
        const userRes = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}`,
            { headers: authHeaders }
        );
        if (!userRes.ok) throw new Error(`GitHub REST error: ${userRes.status}`);
        const user = await userRes.json();

        // ── 2. GraphQL: contribution heatmap ─────────────────────
        const now = new Date();
        // Rolling 52-week window: exactly 1 year ago → today (matches GitHub's own heatmap)
        const toDate = now.toISOString();
        const oneYearAgo = new Date(now);
        oneYearAgo.setFullYear(now.getFullYear() - 1);
        const fromDate = oneYearAgo.toISOString();


        const graphqlQuery = {
            query: `
                query($login: String!, $from: DateTime!, $to: DateTime!) {
                    user(login: $login) {
                        contributionsCollection(from: $from, to: $to) {
                            totalCommitContributions
                            contributionCalendar {
                                totalContributions
                                weeks {
                                    contributionDays {
                                        contributionCount
                                        date
                                        weekday
                                    }
                                }
                            }
                        }
                    }
                }
            `,
            variables: { login: GITHUB_USERNAME, from: fromDate, to: toDate },
        };

        const gqlRes = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: authHeaders,
            body: JSON.stringify(graphqlQuery),
        });
        if (!gqlRes.ok) throw new Error(`GitHub GraphQL error: ${gqlRes.status}`);
        const gqlData = await gqlRes.json();

        if (gqlData.errors) {
            throw new Error(gqlData.errors[0]?.message || 'GraphQL error');
        }

        const collection = gqlData.data.user.contributionsCollection;
        const calendar = collection.contributionCalendar;

        // ── 3. Calculate streak ───────────────────────────────────
        let streak = 0;
        const allDays = calendar.weeks
            .flatMap(w => w.contributionDays)
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        for (const day of allDays) {
            if (day.contributionCount > 0) {
                streak++;
            } else {
                // Allow today to be zero (day is still in progress)
                const isToday = day.date === now.toISOString().slice(0, 10);
                if (!isToday) break;
            }
        }

        // ── 4. Count total stars across all repos ─────────────────
        let totalStars = 0;
        let page = 1;
        while (true) {
            const reposRes = await fetch(
                `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&page=${page}`,
                { headers: authHeaders }
            );
            if (!reposRes.ok) break;
            const repos = await reposRes.json();
            if (repos.length === 0) break;
            totalStars += repos.reduce((sum, r) => sum + r.stargazers_count, 0);
            if (repos.length < 100) break;
            page++;
        }

        // ── 5. Build response ─────────────────────────────────────
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                totalRepos: user.public_repos,
                followers: user.followers,
                totalStars,
                totalCommitsThisYear: collection.totalCommitContributions,
                totalContributions: calendar.totalContributions,
                streak,
                contributionWeeks: calendar.weeks.map(w => ({
                    days: w.contributionDays.map(d => ({
                        count: d.contributionCount,
                        date: d.date,
                        weekday: d.weekday,
                    })),
                })),
            }),
        };
    } catch (err) {
        console.error('github-stats function error:', err);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: err.message }),
        };
    }
};
