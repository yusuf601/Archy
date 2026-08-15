import { useEffect, useRef } from 'react'
import { FiX } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useDesktopShell } from './DesktopShellContext'

export default function DesktopAppFrame({ app, title, children }) {
    const navigate = useNavigate()
    const frameRef = useRef(null)
    const { registerActiveApp } = useDesktopShell()

    useEffect(() => {
        registerActiveApp(frameRef.current)
        return () => registerActiveApp(null)
    }, [registerActiveApp])

    return (
        <section
            ref={frameRef}
            tabIndex={-1}
            className="desktop-app-frame"
            data-mode={app.mode}
            aria-label={title}
        >
            <header className="desktop-app-titlebar">
                <div>
                    <p>{app.label}</p>
                    <h1>{title}</h1>
                </div>
                <button type="button" aria-label={`Close ${app.label}`} onClick={() => navigate('/')}>
                    <FiX aria-hidden="true" />
                </button>
            </header>
            <div className="desktop-app-content">
                {children}
            </div>
        </section>
    )
}
