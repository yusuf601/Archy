import { useNavigate } from 'react-router-dom'
import DesktopAppFrame from './DesktopAppFrame'

const app = { id: 'not-found', label: 'Not Found', mode: 'medium' }

export default function DesktopNotFound() {
    const navigate = useNavigate()

    return (
        <DesktopAppFrame app={app} title="Not Found">
            <div className="desktop-empty-state">
                <p>This route does not have a desktop app.</p>
                <button type="button" onClick={() => navigate('/')}>Return to Desktop</button>
            </div>
        </DesktopAppFrame>
    )
}
