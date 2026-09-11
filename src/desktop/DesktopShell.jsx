import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import DesktopDock from './DesktopDock'
import DesktopMenuBar from './DesktopMenuBar'
import DesktopRoutes from './DesktopRoutes'
import DesktopWallpaper from './DesktopWallpaper'
import KittyWindow from './KittyWindow'
import { DesktopShellProvider, useDesktopShell } from './DesktopShellContext'
import { resolveDesktopApp } from './desktopApps'
import './desktop.css'

export default function DesktopShell() {
    return (
        <DesktopShellProvider>
            <DesktopShellInner />
        </DesktopShellProvider>
    )
}

function DesktopShellInner() {
    const location = useLocation()
    const activeApp = resolveDesktopApp(location.pathname)
    const { activeMenu, closeMenus, kittyOpen, closeKitty, toggleKitty, quiet } = useDesktopShell()

    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'j') {
                event.preventDefault()
                toggleKitty(document.activeElement)
            }

            if (event.key === 'Escape') {
                if (activeMenu) {
                    closeMenus()
                    return
                }
                if (kittyOpen) closeKitty()
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [activeMenu, closeKitty, closeMenus, kittyOpen, toggleKitty])

    return (
        <div
            data-testid="desktop-shell"
            className="desktop-shell"
            data-active-app={activeApp?.id ?? 'desktop'}
            data-kitty-open={kittyOpen ? 'true' : 'false'}
        >
            <DesktopWallpaper appOpen={Boolean(activeApp) || kittyOpen || quiet} />
            <DesktopMenuBar activeApp={activeApp} />
            <div className="desktop-work-area">
                <div className="desktop-dim-layer" />
                <DesktopRoutes />
                <KittyWindow />
                <DesktopDock />
            </div>
        </div>
    )
}
