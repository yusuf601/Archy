import DesktopAppFrame from '../DesktopAppFrame'
import { DESKTOP_APPS } from '../desktopApps'

export default function NotesApp() {
    return (
        <DesktopAppFrame app={DESKTOP_APPS.notes} title="Notes">
            <div className="desktop-placeholder">
                <p>Markdown notes</p>
                <h2>Blog entries will open here.</h2>
            </div>
        </DesktopAppFrame>
    )
}
