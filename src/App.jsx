import DesktopShell from './desktop/DesktopShell'
import useMediaQuery from './hooks/useMediaQuery'
import MobilePortfolio from './layouts/MobilePortfolio'

export default function App() {
    const isDesktop = useMediaQuery('(min-width: 1024px)')
    return isDesktop ? <DesktopShell /> : <MobilePortfolio />
}
