import { FiGithub, FiLinkedin, FiX } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import OnScreenShelf from '../../components/about/OnScreenShelf'
import { aboutProfile, onScreenItems } from '../../data/aboutContent'
import { profile } from '../../data/profile'
import DesktopAppFrame from '../DesktopAppFrame'
import { DESKTOP_APPS } from '../desktopApps'
import './AboutApp.css'

export default function AboutApp() {
    const navigate = useNavigate()

    return (
        <DesktopAppFrame app={DESKTOP_APPS.about} title="About Yusuf" titlebar={
            <header className="about-window-bar">
                <div className="about-window-dots" aria-hidden="true">
                    <span /><span /><span />
                </div>
                <h1 className="about-window-title">About Yusuf</h1>
                <div className="about-window-actions">
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
                        <FiLinkedin aria-hidden="true" />
                    </a>
                    <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
                        <FiGithub aria-hidden="true" />
                    </a>
                    <button type="button" aria-label="Close About Yusuf" title="Close" onClick={() => navigate('/')}>
                        <FiX aria-hidden="true" />
                    </button>
                </div>
            </header>
        }>
            <div className="about-overview-app">
                <div className="about-reading-pane" tabIndex={0} role="region" aria-label="About Yusuf content">
                    <article className="about-dossier" aria-labelledby="about-profile-heading">
                        <header className="about-identity">
                            <p className="about-byline">{aboutProfile.name}</p>
                            <h2 id="about-profile-heading">Hi, I’m Yusuf.</h2>
                        </header>
                        <div className="about-introduction">
                            <div className="about-letter">
                                <p>I’m an <span>Informatics student</span> at <strong>{aboutProfile.university}</strong>,
                                    currently in my <span>{aboutProfile.semester}</span> of <span>{aboutProfile.major}</span>.</p>
                                <p>My interests lie in <span>{aboutProfile.interests[0]}</span>, <span>{aboutProfile.interests[1]}</span>,
                                    and <span>{aboutProfile.interests[2]}</span>.</p>
                            </div>
                            <aside className="about-margin-note" aria-labelledby="about-learning-heading">
                                <h3 id="about-learning-heading">Currently learning</h3>
                                <ul>{aboutProfile.currentLearning.map(topic => <li key={topic}>{topic}</li>)}</ul>
                            </aside>
                        </div>
                        <OnScreenShelf items={onScreenItems} />
                    </article>
                </div>
            </div>
        </DesktopAppFrame>
    )
}
