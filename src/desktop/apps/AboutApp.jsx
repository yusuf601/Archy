import DesktopAppFrame from '../DesktopAppFrame'
import { DESKTOP_APPS } from '../desktopApps'

export default function AboutApp() {
    return (
        <DesktopAppFrame app={DESKTOP_APPS.about} title="About Yusuf">
            <div className="desktop-placeholder">
                <p>Profile</p>
                <h2>Systems programmer, portfolio workstation.</h2>
            </div>
        </DesktopAppFrame>
    )
}
