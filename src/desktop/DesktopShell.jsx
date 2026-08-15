import { useLocation } from 'react-router-dom'
import DesktopMenuBar from './DesktopMenuBar'
import DesktopRoutes from './DesktopRoutes'
import { DesktopShellProvider } from './DesktopShellContext'
import { resolveDesktopApp } from './desktopApps'
import './desktop.css'

export default function DesktopShell() {
    const location = useLocation()
    const activeApp = resolveDesktopApp(location.pathname)

    return (
        <DesktopShellProvider>
            <div data-testid="desktop-shell" className="desktop-shell" data-active-app={activeApp?.id ?? 'desktop'}>
                <DesktopMenuBar activeApp={activeApp} />
                <div className="desktop-work-area">
                    <div className="desktop-dim-layer" />
                    <DesktopRoutes />
                </div>
            </div>
        </DesktopShellProvider>
    )
}
