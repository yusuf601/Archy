import DesktopAppFrame from '../DesktopAppFrame'
import { DESKTOP_APPS } from '../desktopApps'
import { FiMail, FiGithub, FiLinkedin, FiTerminal } from 'react-icons/fi'
import { useDesktopShell } from '../DesktopShellContext'

export default function MailApp() {
    const { toggleKitty } = useDesktopShell()

    return (
        <DesktopAppFrame app={DESKTOP_APPS.mail} title="Contact">
            <div className="mail-app-content">
                <div className="mail-header">
                    <h2>Get in Touch</h2>
                    <p>I'm open to discussing systems programming, AI research, and new opportunities.</p>
                </div>
                
                <div className="mail-actions">
                    <a href="mailto:hello@yusuf601.com" className="mail-action-card">
                        <div className="mail-action-icon"><FiMail /></div>
                        <div className="mail-action-text">
                            <strong>Email</strong>
                            <span>hello@yusuf601.com</span>
                        </div>
                    </a>

                    <a href="https://github.com/yusuf601" target="_blank" rel="noopener noreferrer" className="mail-action-card">
                        <div className="mail-action-icon"><FiGithub /></div>
                        <div className="mail-action-text">
                            <strong>GitHub</strong>
                            <span>@yusuf601</span>
                        </div>
                    </a>

                    <a href="https://linkedin.com/in/yusuf601" target="_blank" rel="noopener noreferrer" className="mail-action-card">
                        <div className="mail-action-icon"><FiLinkedin /></div>
                        <div className="mail-action-text">
                            <strong>LinkedIn</strong>
                            <span>Connect</span>
                        </div>
                    </a>

                    <button type="button" onClick={(event) => toggleKitty(event.currentTarget)} className="mail-action-card">
                        <div className="mail-action-icon"><FiTerminal /></div>
                        <div className="mail-action-text">
                            <strong>Terminal</strong>
                            <span>Ping me directly</span>
                        </div>
                    </button>
                </div>
            </div>
        </DesktopAppFrame>
    )
}
