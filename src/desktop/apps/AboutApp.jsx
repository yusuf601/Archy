import { FiArrowUpRight, FiBookOpen, FiFileText, FiFilm, FiTerminal } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import OnScreenShelf from '../../components/about/OnScreenShelf'
import { aboutProfile, aboutSections, aboutVisualAssets, onScreenItems } from '../../data/aboutContent'
import DesktopAppFrame from '../DesktopAppFrame'
import { DESKTOP_APPS } from '../desktopApps'

function getApprovedSection(section) {
    const heading = section.heading ?? section.title
    const copy = section.copy ?? section.content
    if (typeof heading !== 'string' || typeof copy !== 'string' || !heading.trim() || !copy.trim()) return null
    return { heading, copy }
}

export default function AboutApp() {
    const approvedSections = aboutSections.map(getApprovedSection).filter(Boolean)

    return (
        <DesktopAppFrame app={DESKTOP_APPS.about} title="About Yusuf">
            <div className="about-workspace">
                <aside className="desk-sidebar" aria-label="Workspace navigation">
                    <div className="desk-owner">
                        <img src={aboutVisualAssets.portrait} alt={`Pixel-art portrait of ${aboutProfile.name}`} width="112" height="112" />
                        <p>Yusuf’s desk</p>
                        <span>A personal workspace</span>
                    </div>
                    <nav aria-label="About sections">
                        <a href="#about-profile-heading"><FiFileText aria-hidden="true" /> Introduction</a>
                        <a href="#about-learning-heading"><FiBookOpen aria-hidden="true" /> Learning</a>
                        <a href="#on-screen-heading"><FiFilm aria-hidden="true" /> On Screen</a>
                    </nav>
                    <div className="desk-system">
                        <FiTerminal aria-hidden="true" />
                        <div><span>Daily driver</span><p>{aboutProfile.operatingSystem}</p></div>
                    </div>
                </aside>

                <div className="desk-canvas">
                    <div className="desk-heading"><FiBookOpen aria-hidden="true" /><p>A little about me</p></div>
                    <div className="desk-top">
                        <section className="desk-letter" aria-labelledby="about-profile-heading">
                            <p className="desk-greeting">Hey, I’m</p>
                            <h2 id="about-profile-heading">{aboutProfile.name}</h2>
                            <p className="desk-intro">An informatics student exploring how computers see, learn, and work.</p>
                            <div className="desk-focus">
                                <span>My focus</span>
                                <p>{aboutProfile.specialization}</p>
                            </div>
                            <Link to="/projects" className="desk-project-link">Explore my projects <FiArrowUpRight aria-hidden="true" /></Link>
                        </section>

                        <div className="desk-notes">
                            <section className="desk-study" aria-labelledby="about-education-heading">
                                <h3 id="about-education-heading">Profile</h3>
                                <div className="desk-university">
                                    <img src={aboutVisualAssets.universityLogo} alt={`${aboutProfile.university} logo`} width="44" height="52" />
                                    <div><p>{aboutProfile.university}</p><span>{aboutProfile.major}</span></div>
                                </div>
                                <p className="desk-semester">{aboutProfile.semester}</p>
                            </section>
                            <section className="desk-learning" aria-labelledby="about-learning-heading">
                                <h3 id="about-learning-heading">Currently learning</h3>
                                <ul>{aboutProfile.currentLearning.map(item => <li key={item}><FiBookOpen aria-hidden="true" />{item}</li>)}</ul>
                            </section>
                        </div>
                    </div>

                    <section className="about-personal-section" aria-label="Personal details">
                        {approvedSections.map(section => (
                            <section key={section.heading} className="about-section">
                                <h3>{section.heading}</h3><p>{section.copy}</p>
                            </section>
                        ))}
                        <OnScreenShelf items={onScreenItems} />
                    </section>
                </div>
            </div>
        </DesktopAppFrame>
    )
}
