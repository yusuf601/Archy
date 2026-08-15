import DesktopAppFrame from '../DesktopAppFrame'
import { DESKTOP_APPS } from '../desktopApps'

export default function FilesApp() {
    return (
        <DesktopAppFrame app={DESKTOP_APPS.files} title="Projects">
            <div className="desktop-placeholder">
                <p>Project browser</p>
                <h2>Build artifacts will open here.</h2>
            </div>
        </DesktopAppFrame>
    )
}
