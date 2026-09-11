import { useEffect, useRef, useState } from 'react'
import wallpaperVideo from '../assets/wallpapers/forest-water-loop.mp4'

export default function DesktopWallpaper({ appOpen }) {
    const videoRef = useRef(null)
    const [visible, setVisible] = useState(() => document.visibilityState === 'visible')
    const [reducedMotion, setReducedMotion] = useState(
        () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false,
    )
    const [failed, setFailed] = useState(false)
    const useVideo = !reducedMotion && !failed

    useEffect(() => {
        const updateVisibility = () => setVisible(document.visibilityState === 'visible')
        const preference = window.matchMedia?.('(prefers-reduced-motion: reduce)')
        const updateMotion = () => setReducedMotion(preference.matches)
        document.addEventListener('visibilitychange', updateVisibility)
        preference?.addEventListener('change', updateMotion)
        return () => {
            document.removeEventListener('visibilitychange', updateVisibility)
            preference?.removeEventListener('change', updateMotion)
        }
    }, [])

    useEffect(() => {
        const video = videoRef.current
        if (!useVideo || appOpen || !visible) {
            video.pause()
        } else {
            // Autoplay can be denied or interrupted by a rapid app switch.
            // Keep the poster/current frame in either case.
            video.play()?.catch(() => {})
        }
        return () => video.pause()
    }, [appOpen, visible, useVideo])

    return (
        <video
            ref={videoRef}
            className="desktop-wallpaper"
            src={useVideo ? wallpaperVideo : undefined}
            poster="/wallpapers/forest-workstation.png"
            preload="metadata"
            loop
            muted
            playsInline
            aria-hidden="true"
            tabIndex={-1}
            onError={() => setFailed(true)}
        />
    )
}
