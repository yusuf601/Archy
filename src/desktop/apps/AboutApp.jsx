import OnScreenShelf from '../../components/about/OnScreenShelf'
import {
    aboutProfile,
    aboutSections,
    aboutVisualAssets,
    onScreenItems,
} from '../../data/aboutContent'
import DesktopAppFrame from '../DesktopAppFrame'
import { DESKTOP_APPS } from '../desktopApps'

function getApprovedSection(section) {
    const heading = section.heading ?? section.title
    const copy = section.copy ?? section.content

    if (typeof heading !== 'string' || typeof copy !== 'string' || !copy.trim()) {
        return null
    }

    return { heading, copy }
}

export default function AboutApp() {
    const approvedSections = aboutSections
        .map(getApprovedSection)
        .filter(Boolean)

    return (
        <DesktopAppFrame app={DESKTOP_APPS.about} title="About Yusuf">
            <div className="about-app-content">
                <section className="about-profile-section" aria-labelledby="about-profile-heading">
                    <div className="about-app-grid">
                        <div className="about-app-copy">
                            <header className="about-header">
                                <p className="about-kicker">About</p>
                                <h2 id="about-profile-heading">{aboutProfile.name}</h2>
                                <p className="about-subtitle">
                                    {aboutProfile.major} at {aboutProfile.university}
                                </p>
                            </header>

                            <section className="about-section">
                                <h3>Profile</h3>
                                <p>{aboutProfile.semester}</p>
                                <p>{aboutProfile.specialization}</p>
                                <p>{aboutProfile.operatingSystem}</p>
                                <img
                                    className="about-university-logo"
                                    src={aboutVisualAssets.universityLogo}
                                    alt={`${aboutProfile.university} logo`}
                                />
                            </section>

                            <section className="about-section">
                                <h3>Currently learning</h3>
                                <ul className="about-learning-list">
                                    {aboutProfile.currentLearning.map((item) => <li key={item}>{item}</li>)}
                                </ul>
                            </section>
                        </div>

                        <aside className="about-app-visual" aria-label="Profile artwork">
                            <img
                                className="about-illustration"
                                src={aboutVisualAssets.portrait}
                                alt={`Anime portrait of ${aboutProfile.name}`}
                            />
                        </aside>
                    </div>
                </section>

                <section className="about-personal-section" aria-label="Personal details">
                    {approvedSections.map((section) => (
                        <section key={section.heading} className="about-section">
                            <h3>{section.heading}</h3>
                            <p>{section.copy}</p>
                        </section>
                    ))}
                    <OnScreenShelf items={onScreenItems} />
                </section>
            </div>
        </DesktopAppFrame>
    )
}
