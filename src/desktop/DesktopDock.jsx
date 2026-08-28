import { FiFileText, FiFolder, FiMail, FiUser } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom'
import { DESKTOP_APPS } from './desktopApps'
import { useDesktopShell } from './DesktopShellContext'

const dockApps = [
    { id: 'about', label: 'About Yusuf', route: DESKTOP_APPS.about.route, icon: FiUser },
    { id: 'files', label: 'Files', route: DESKTOP_APPS.files.route, icon: FiFolder },
    { id: 'notes', label: 'Notes', route: DESKTOP_APPS.notes.route, icon: FiFileText },
    { id: 'mail', label: 'Mail', route: DESKTOP_APPS.mail.route, icon: FiMail },
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
                const Icon = app.icon

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
                        <Icon aria-hidden="true" />
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
                <img src="/icons/kitty-dark.png" alt="" />
            </button>
        </nav>
    )
}
