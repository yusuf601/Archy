import DesktopAppFrame from '../DesktopAppFrame'
import { DESKTOP_APPS } from '../desktopApps'
import { FiExternalLink, FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

export default function AboutApp() {
    return (
        <DesktopAppFrame app={DESKTOP_APPS.about} title="About Yusuf">
            <div className="about-app-content">
                <header className="about-header">
                    <h2>Muh Yusuf</h2>
                    <p className="about-subtitle">Systems Programmer & AI Researcher</p>
                </header>

                <section className="about-section">
                    <h3>Profile</h3>
                    <p>
                        I build high-performance systems and explore the boundaries of AI stylometry. 
                        My work focuses on optimizing algorithms, writing efficient C++/Rust code, 
                        and building robust software architectures.
                    </p>
                </section>

                <section className="about-section">
                    <h3>Working Principles</h3>
                    <ul className="about-principles">
                        <li><strong>Performance matters:</strong> Always profile before parallelizing.</li>
                        <li><strong>Simplicity scales:</strong> Complex systems break in complex ways.</li>
                        <li><strong>Understand the metal:</strong> High-level abstractions are built on hardware realities.</li>
                    </ul>
                </section>

                <section className="about-section">
                    <h3>Links & Resume</h3>
                    <div className="about-links">
                        <a href="https://github.com/yusuf601" target="_blank" rel="noopener noreferrer" className="about-link-button">
                            <FiGithub /> GitHub <FiExternalLink />
                        </a>
                        <a href="https://linkedin.com/in/yusuf601" target="_blank" rel="noopener noreferrer" className="about-link-button">
                            <FiLinkedin /> LinkedIn <FiExternalLink />
                        </a>
                        <a href="/MuhYusuf_Resume.pdf" download className="about-link-button primary">
                            <FiDownload /> Download Resume
                        </a>
                    </div>
                </section>
            </div>
        </DesktopAppFrame>
    )
}
