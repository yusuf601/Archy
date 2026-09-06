import { useRef } from 'react'
import AboutSectionNav from '../../components/about/AboutSectionNav'
import OnScreenShelf from '../../components/about/OnScreenShelf'
import { aboutProfile, aboutVisualAssets, onScreenItems } from '../../data/aboutContent'
import DesktopAppFrame from '../DesktopAppFrame'
import { DESKTOP_APPS } from '../desktopApps'
import './AboutApp.css'

export default function AboutApp() {
    const scrollRef = useRef(null)
    const overviewRef = useRef(null)
    const onScreenRef = useRef(null)

    return (
        <DesktopAppFrame app={DESKTOP_APPS.about} title="About Yusuf">
            <div className="about-overview-app">
                <AboutSectionNav scrollRef={scrollRef} overviewRef={overviewRef} onScreenRef={onScreenRef} />
                <div ref={scrollRef} className="about-reading-pane" tabIndex={0}
                    role="region" aria-label="About Yusuf content">
                    <div className="about-document">
                        <section ref={overviewRef} aria-labelledby="about-profile-heading">
                            <div className="about-profile-header">
                                <img src={aboutVisualAssets.portrait} alt="Pixel-art portrait of Muh Yusuf" width="112" height="112" />
                                <div>
                                    <h2 id="about-profile-heading" tabIndex={-1}>{aboutProfile.name}</h2>
                                    <p>{aboutProfile.role}</p>
                                    <div className="about-education">
                                        <img src={aboutVisualAssets.universityLogo} alt="Halu Oleo University logo" width="40" height="40" />
                                        <div>
                                            <p>{aboutProfile.university}</p>
                                            <p>{aboutProfile.major}</p>
                                            <p>{aboutProfile.semester}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="about-learning-columns">
                                <section aria-labelledby="about-interests-heading">
                                    <h3 id="about-interests-heading">Interests</h3>
                                    <ul>{aboutProfile.interests.map(item => <li key={item}>{item}</li>)}</ul>
                                </section>
                                <section aria-labelledby="about-learning-heading">
                                    <h3 id="about-learning-heading">Currently Learning</h3>
                                    <ul>{aboutProfile.currentLearning.map(item => <li key={item}>{item}</li>)}</ul>
                                </section>
                            </div>
                        </section>
                        <div ref={onScreenRef}>
                            <OnScreenShelf items={onScreenItems} />
                        </div>
                    </div>
                </div>
            </div>
        </DesktopAppFrame>
    )
}
