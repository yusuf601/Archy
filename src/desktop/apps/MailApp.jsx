import DesktopAppFrame from '../DesktopAppFrame'
import { DESKTOP_APPS } from '../desktopApps'

export default function MailApp() {
    return (
        <DesktopAppFrame app={DESKTOP_APPS.mail} title="Contact">
            <div className="desktop-placeholder">
                <p>Mail</p>
                <h2>Contact actions will open here.</h2>
            </div>
        </DesktopAppFrame>
    )
}
