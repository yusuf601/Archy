import { FiBatteryCharging, FiChevronLeft, FiChevronRight, FiCpu, FiDatabase, FiHardDrive, FiVolume2, FiWifi } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { profile } from '../data/profile'
import { useClock } from '../hooks/useClock'
import { useOnlineStatus } from '../hooks/useOnlineStatus'
import { useSystemTelemetry } from '../hooks/useSystemTelemetry'
import { DESKTOP_APPS } from './desktopApps'
import { useDesktopShell } from './DesktopShellContext'
import MenuPopover from './MenuPopover'
import ControlCenter from './ControlCenter'

function MenuButton({ id, label, activeMenu, openMenu, children }) {
    const open = activeMenu === id

    return (
        <button
            id={`${id}-menu-button`}
            type="button"
            aria-label={label}
            aria-haspopup="menu"
            aria-expanded={open}
            className="desktop-menu-button"
            onClick={() => (open ? openMenu(null) : openMenu(id))}
        >
            {children}
        </button>
    )
}

function MenuItemButton({ children, onClick }) {
    return (
        <button type="button" role="menuitem" onClick={onClick}>
            {children}
        </button>
    )
}

export default function DesktopMenuBar({ activeApp }) {
    const navigate = useNavigate()
    const telemetry = useSystemTelemetry()
    const clock = useClock()
    const online = useOnlineStatus()
    const { activeMenu, openMenu, closeMenus } = useDesktopShell()

    const navigateMenu = (route) => {
        closeMenus()
        navigate(route)
    }

    const copyRoute = async () => {
        await navigator.clipboard?.writeText?.(window.location.href)
        closeMenus()
    }

    return (
        <header className="desktop-menu-bar">
            <div className="desktop-menu-left">
                <div className="desktop-menu-group">
                    <MenuButton id="yusuf" label="Yusuf menu" activeMenu={activeMenu} openMenu={openMenu}>
                        Yusuf
                    </MenuButton>
                    {activeMenu === 'yusuf' && (
                        <MenuPopover id="yusuf-menu" labelledBy="yusuf-menu-button" onClose={closeMenus}>
                            <MenuItemButton onClick={() => navigateMenu('/about')}>About Yusuf</MenuItemButton>
                            <a role="menuitem" href={profile.resume}>Resume</a>
                            <a role="menuitem" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
                            <a role="menuitem" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                        </MenuPopover>
                    )}
                </div>

                <div className="desktop-menu-group">
                    <MenuButton id="app" label="Application menu" activeMenu={activeMenu} openMenu={openMenu}>
                        {activeApp?.label ?? 'Desktop'}
                    </MenuButton>
                    {activeMenu === 'app' && (
                        <MenuPopover id="app-menu" labelledBy="app-menu-button" onClose={closeMenus}>
                            <MenuItemButton onClick={() => navigateMenu('/')}>Close active app</MenuItemButton>
                            <MenuItemButton onClick={copyRoute}>Copy route link</MenuItemButton>
                            <MenuItemButton onClick={() => navigateMenu('/')}>Desktop</MenuItemButton>
                            <MenuItemButton onClick={() => navigateMenu(DESKTOP_APPS.files.route)}>Files</MenuItemButton>
                            <MenuItemButton onClick={() => navigateMenu(DESKTOP_APPS.notes.route)}>Notes</MenuItemButton>
                            <MenuItemButton onClick={() => navigateMenu(DESKTOP_APPS.mail.route)}>Mail</MenuItemButton>
                            <MenuItemButton onClick={() => navigateMenu(DESKTOP_APPS.github.route)}>GitHub</MenuItemButton>
                            <MenuItemButton onClick={() => window.history.back()}><FiChevronLeft aria-hidden="true" /> Back</MenuItemButton>
                            <MenuItemButton onClick={() => window.history.forward()}><FiChevronRight aria-hidden="true" /> Forward</MenuItemButton>
                        </MenuPopover>
                    )}
                </div>
            </div>

            <div className="desktop-menu-right" aria-label="Workstation status">
                <span className="desktop-status-widget desktop-status-telemetry" title="simulated workstation telemetry">
                    <FiCpu aria-hidden="true" /> CPU {telemetry.cpu}%
                </span>
                <span className="desktop-status-widget" title="simulated workstation telemetry">
                    <FiDatabase aria-hidden="true" /> RAM {telemetry.ramGiB.toFixed(2)} GiB
                </span>
                <span className="desktop-status-widget" title="simulated workstation telemetry">
                    <FiHardDrive aria-hidden="true" /> Storage {telemetry.storageGiB.toFixed(2)} GB
                </span>
                <span className="desktop-status-widget">
                    <FiWifi aria-hidden="true" /> {online ? 'Network' : 'Offline'}
                </span>
                <span className="desktop-status-widget">
                    <FiBatteryCharging aria-hidden="true" /> {telemetry.battery}%
                </span>
                <span className="desktop-status-widget">
                    <FiVolume2 aria-hidden="true" /> {telemetry.volume}
                </span>
                <span className="desktop-status-widget desktop-clock">{clock}</span>

                <ControlCenter />
            </div>
        </header>
    )
}
