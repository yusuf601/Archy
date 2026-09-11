import { useEffect, useRef, useState } from 'react'
import { FiBluetooth, FiCheck, FiMaximize, FiMoon, FiPower, FiRefreshCw, FiSliders, FiSun, FiWifi, FiWind, FiBellOff } from 'react-icons/fi'
import { createPortal } from 'react-dom'
import { useDesktopShell } from './DesktopShellContext'

export default function ControlCenter() {
    const { activeMenu, openMenu, closeMenus, closeAll, setQuiet } = useDesktopShell()
    const open = activeMenu === 'control-center'
    const trigger = useRef(null)
    const panel = useRef(null)
    const wakeButton = useRef(null)
    const [settings, setSettings] = useState({ wifi: true, airplane: false, bluetooth: false, quiet: false, dark: false })
    const [fullscreen, setFullscreen] = useState(Boolean(document.fullscreenElement))
    const [error, setError] = useState('')
    const [power, setPower] = useState(null)

    useEffect(() => {
        const sync = () => setFullscreen(Boolean(document.fullscreenElement))
        document.addEventListener('fullscreenchange', sync)
        return () => document.removeEventListener('fullscreenchange', sync)
    }, [])

    useEffect(() => {
        const shell = trigger.current?.closest('.desktop-shell')
        if (!shell) return
        shell.dataset.theme = settings.dark ? 'dark' : 'light'
        shell.dataset.quiet = String(settings.quiet)
        setQuiet(settings.quiet || Boolean(power))
    }, [settings.dark, settings.quiet, power, setQuiet])

    useEffect(() => {
        if (!open) return
        panel.current?.querySelector('button')?.focus()
        const dismiss = (event) => {
            if (!panel.current?.contains(event.target) && !trigger.current?.contains(event.target)) closeMenus()
        }
        const keyboard = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault()
                event.stopPropagation()
                closeMenus()
                trigger.current?.focus()
            }
            if (event.key === 'Tab') {
                const buttons = [...panel.current.querySelectorAll('button:not(:disabled)')]
                const first = buttons[0]
                const last = buttons.at(-1)
                if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
                if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
            }
        }
        document.addEventListener('pointerdown', dismiss)
        document.addEventListener('keydown', keyboard)
        return () => {
            document.removeEventListener('pointerdown', dismiss)
            document.removeEventListener('keydown', keyboard)
        }
    }, [open, closeMenus])

    useEffect(() => {
        if (!power) return
        const shell = trigger.current.closest('.desktop-shell')
        shell.inert = true
        wakeButton.current?.focus()
        const keepFocus = (event) => {
            if (event.key === 'Tab') { event.preventDefault(); wakeButton.current?.focus() }
            event.stopPropagation()
        }
        document.addEventListener('keydown', keepFocus)
        return () => {
            shell.inert = false
            document.removeEventListener('keydown', keepFocus)
            trigger.current?.focus()
        }
    }, [power])

    const toggle = (key) => setSettings(previous => {
        const next = { ...previous, [key]: !previous[key] }
        if (key === 'airplane' && next.airplane) { next.wifi = false; next.bluetooth = false }
        if ((key === 'wifi' || key === 'bluetooth') && next[key]) next.airplane = false
        return next
    })

    const toggleFullscreen = async () => {
        setError('')
        try {
            if (document.fullscreenElement) await document.exitFullscreen()
            else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen()
            else setError('Fullscreen is unavailable in this browser.')
        } catch { setError('Fullscreen could not be opened. Please try again.') }
    }

    const tiles = [
        { key: 'wifi', label: 'Wi-Fi', icon: FiWifi, detail: settings.wifi ? 'On · simulated' : 'Off · simulated' },
        { key: 'airplane', label: 'Airplane mode', icon: FiWind, detail: 'Simulated' },
        { key: 'bluetooth', label: 'Bluetooth', icon: FiBluetooth, detail: 'Simulated' },
        { key: 'quiet', label: 'Do not disturb', icon: FiBellOff, detail: 'Pause wallpaper' },
        { key: 'fullscreen', label: 'Fullscreen', icon: FiMaximize, detail: 'Browser display' },
        { key: 'dark', label: 'Dark mode', icon: settings.dark ? FiMoon : FiSun, detail: 'Desktop appearance' },
    ]

    const powerAction = (action) => {
        closeMenus()
        if (action === 'shutdown') closeAll()
        setPower(action)
    }

    return (
        <div className="desktop-menu-group">
            <button ref={trigger} type="button" className="desktop-menu-button control-center-trigger" aria-label="Control Center" aria-haspopup="dialog" aria-expanded={open} aria-controls="control-center" onClick={() => openMenu(open ? null : 'control-center')}>
                <FiSliders aria-hidden="true" />
            </button>
            {open && <section ref={panel} id="control-center" role="dialog" aria-label="Control Center" className="control-center-panel">
                <div className="control-center-heading"><span>Control Center</span><span>DESKTOP</span></div>
                <div className="control-center-grid">
                    {tiles.map(({ key, label, icon: Icon, detail }) => {
                        const enabled = key === 'fullscreen' ? fullscreen : settings[key]
                        return <button key={key} type="button" className="control-center-tile" aria-pressed={enabled} onClick={() => key === 'fullscreen' ? toggleFullscreen() : toggle(key)}>
                            <span className="control-center-tile-icon"><Icon aria-hidden="true" />{enabled && <FiCheck className="control-center-check" aria-hidden="true" />}</span>
                            <span>{label}</span><small>{detail}</small>
                        </button>
                    })}
                </div>
                {error && <p role="status" className="control-center-error">{error}</p>}
                <div className="control-center-power">
                    <button type="button" onClick={() => powerAction('sleep')}><FiMoon aria-hidden="true" /><span>Sleep</span></button>
                    <button type="button" onClick={() => window.location.reload()}><FiRefreshCw aria-hidden="true" /><span>Restart</span></button>
                    <button type="button" onClick={() => powerAction('shutdown')}><FiPower aria-hidden="true" /><span>Shutdown</span></button>
                </div>
            </section>}
            {power && createPortal(<div className={`desktop-power-screen desktop-power-${power}`} role="dialog" aria-modal="true" aria-label={power === 'sleep' ? 'Desktop sleeping' : 'Desktop shut down'}>
                {power === 'sleep' ? <FiMoon aria-hidden="true" /> : <FiPower aria-hidden="true" />}
                <h1>{power === 'sleep' ? 'Taking a moment.' : 'See you soon.'}</h1>
                <p>{power === 'sleep' ? 'Your desktop is sleeping.' : 'Your desktop is shut down.'}</p>
                <button ref={wakeButton} type="button" onClick={() => setPower(null)}>{power === 'sleep' ? 'Wake desktop' : 'Power on'}</button>
            </div>, document.body)}
        </div>
    )
}
