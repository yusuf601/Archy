import { useLocation, useNavigate } from 'react-router-dom'
import aboutIcon from '../assets/icons/about-folder.png'
import firefoxIcon from '../assets/icons/firefox.png'
import kittyIcon from '../assets/icons/kitty-dark.png'
import vscodeIcon from '../assets/icons/vscode.png'
import { DESKTOP_APPS } from './desktopApps'
import { useDesktopShell } from './DesktopShellContext'

const dockApps = [
    { id: 'about', label: 'About Yusuf', route: DESKTOP_APPS.about.route, icon: aboutIcon },
    { id: 'files', label: 'Projects', route: DESKTOP_APPS.files.route, icon: vscodeIcon },
    { id: 'notes', label: 'Firefox', route: DESKTOP_APPS.notes.route, icon: firefoxIcon },
]

function isRouteActive(pathname, route) {
    return pathname === route || pathname.startsWith(`${route}/`)
}

export default function DesktopDock() {
    const navigate = useNavigate()
    const location = useLocation()
    const { focusActiveApp, toggleKitty, kittyOpen } = useDesktopShell()

    return (
        <nav className="desktop-dock" aria-label="Desktop applications">
            {dockApps.map((app) => {
                const active = isRouteActive(location.pathname, app.route)

                return (
                    <button
                        key={app.id}
                        type="button"
                        aria-label={`Open ${app.label}`}
                        aria-current={active ? 'page' : undefined}
                        className="desktop-dock-button"
                        data-tooltip={app.label}
                        data-active={active ? 'true' : 'false'}
                        onClick={() => (active ? focusActiveApp() : navigate(app.route))}
                    >
                        <img src={app.icon} alt="" />
                    </button>
                )
            })}

            <button
                type="button"
                aria-label="Open Kitty"
                className="desktop-dock-button desktop-dock-kitty"
                data-tooltip="Kitty"
                data-active={kittyOpen ? 'true' : 'false'}
                onClick={(event) => toggleKitty(event.currentTarget)}
            >
                <img src={kittyIcon} alt="" />
            </button>
        </nav>
    )
}
