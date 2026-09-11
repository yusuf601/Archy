import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DesktopShellContext = createContext(null)

export function DesktopShellProvider({ children }) {
    const navigate = useNavigate()
    const [activeMenu, setActiveMenu] = useState(null)
    const [kittyOpen, setKittyOpen] = useState(false)
    const activeAppRef = useRef(null)
    const kittyTriggerRef = useRef(null)

    const openMenu = useCallback((id) => setActiveMenu(id), [])
    const closeMenus = useCallback(() => setActiveMenu(null), [])

    const registerActiveApp = useCallback((node) => {
        activeAppRef.current = node
    }, [])

    const focusActiveApp = useCallback(() => {
        activeAppRef.current?.focus()
    }, [])

    const openKitty = useCallback((triggerElement) => {
        if (triggerElement) kittyTriggerRef.current = triggerElement
        setKittyOpen(true)
    }, [])

    const closeKitty = useCallback(() => {
        setKittyOpen(false)
        window.setTimeout(() => kittyTriggerRef.current?.focus?.(), 0)
    }, [])

    const toggleKitty = useCallback((triggerElement) => {
        if (triggerElement) kittyTriggerRef.current = triggerElement
        setKittyOpen((open) => !open)
    }, [])

    const closeAll = useCallback(() => {
        closeMenus()
        setKittyOpen(false)
        navigate('/')
    }, [closeMenus, navigate])

    return (
        <DesktopShellContext.Provider
            value={{
                activeMenu,
                openMenu,
                closeMenus,
                kittyOpen,
                openKitty,
                closeKitty,
                toggleKitty,
                registerActiveApp,
                focusActiveApp,
                closeAll,
            }}
        >
            {children}
        </DesktopShellContext.Provider>
    )
}

export function useDesktopShell() {
    const context = useContext(DesktopShellContext)
    if (!context) {
        throw new Error('useDesktopShell must be used within DesktopShellProvider')
    }
    return context
}
