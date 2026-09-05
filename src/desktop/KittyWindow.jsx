import { FiX } from 'react-icons/fi'
import Terminal from '../components/Terminal'
import kittyIcon from '../assets/icons/kitty-dark.png'
import { useDesktopShell } from './DesktopShellContext'

export default function KittyWindow() {
    const { kittyOpen, closeKitty } = useDesktopShell()

    return (
        <aside
            data-testid="kitty-window"
            className="kitty-window"
            data-open={kittyOpen ? 'true' : 'false'}
            aria-hidden={!kittyOpen}
            inert={kittyOpen ? undefined : true}
        >
            <header className="kitty-titlebar">
                <div className="kitty-title">
                    <img src={kittyIcon} alt="" />
                    <span>Kitty</span>
                </div>
                <button type="button" aria-label="Close Kitty" onClick={closeKitty}>
                    <FiX aria-hidden="true" />
                </button>
            </header>
            <div className="kitty-terminal-body">
                <Terminal appearance="desktop" isOpen={kittyOpen} onToggle={closeKitty} />
            </div>
        </aside>
    )
}
