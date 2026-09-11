import { FiArrowUpRight, FiGithub, FiActivity } from 'react-icons/fi'
import useGitHubStats from '../../hooks/useGitHubStats'
import ContributionHeatmap from '../../components/ContributionHeatmap'
import DesktopAppFrame from '../DesktopAppFrame'
import { DESKTOP_APPS } from '../desktopApps'
import './GitHubApp.css'

export default function GitHubApp() {
    const { data, loading, error, retry } = useGitHubStats()
    const stats = data ? [
        ['Contributions', data.totalContributions],
        ['Day streak', data.streak],
        ['Repositories', data.totalRepos],
        ['Stars', data.totalStars],
        ['Followers', data.followers],
    ] : []

    return <DesktopAppFrame app={DESKTOP_APPS.github} title="GitHub">
        <div className="github-app">
            <header className="github-profile">
                <div className="github-profile-icon"><FiGithub aria-hidden="true" /></div>
                <div><p>Building in public</p><h2>@yusuf601</h2></div>
                <a href="https://github.com/yusuf601" target="_blank" rel="noreferrer">View profile <FiArrowUpRight aria-hidden="true" /></a>
            </header>
            <section className="github-activity" aria-labelledby="github-activity-title">
                <div className="github-section-heading"><h3 id="github-activity-title"><FiActivity aria-hidden="true" /> Contribution activity</h3><span>Last 12 months</span></div>
                {loading ? <div className="github-loading" role="status">Loading GitHub activity…</div>
                    : error ? <div className="github-unavailable" role="status"><h4>Activity is unavailable right now.</h4><p>Please try again, or visit the GitHub profile.</p><button type="button" onClick={retry}>Try again</button></div>
                    : data ? <>
                        <ContributionHeatmap periodLabel="in the last 12 months" />
                        {data.totalContributions === 0 && <p className="github-empty">No contributions in this period yet.</p>}
                    </> : <p className="github-empty">No activity data available.</p>}
            </section>
            {!loading && !error && data && <section className="github-summary" aria-label="GitHub statistics">
                <div className="github-section-heading"><h3>A little progress, every day.</h3></div>
                <dl>{stats.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{Number.isFinite(value) ? value.toLocaleString() : '—'}</dd></div>)}</dl>
                <p>Contributions cover the last 12 months. Repository, star and follower counts reflect the latest fetched data.</p>
            </section>}
        </div>
    </DesktopAppFrame>
}
