import { useCallback, useEffect, useState } from 'react'

const TOP_BAND = 96

export default function AboutSectionNav({ scrollRef, overviewRef, onScreenRef }) {
    const [active, setActive] = useState('overview')

    const moveToSection = useCallback((id) => {
        const root = scrollRef.current
        const target = id === 'overview' ? overviewRef.current : onScreenRef.current
        if (!root || !target) return
        const top = id === 'overview' ? 0
            : target.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop - 24
        root.scrollTo({ top: Math.max(0, top), behavior: 'auto' })
        target.querySelector('h2')?.focus({ preventScroll: true })
        setActive(root.scrollHeight > root.clientHeight ? id : 'overview')
    }, [scrollRef, overviewRef, onScreenRef])

    useEffect(() => {
        const root = scrollRef.current
        const collection = onScreenRef.current
        if (!root || !collection) return

        function getPosition() {
            const pane = root.getBoundingClientRect()
            const section = collection.getBoundingClientRect()
            const scrollable = root.scrollHeight > root.clientHeight
            const visible = section.bottom > pane.top && section.top < pane.bottom
            return {
                scrollable,
                atBottom: scrollable && root.scrollHeight - root.clientHeight - root.scrollTop <= 2 && visible,
                inTopBand: section.bottom > pane.top && section.top < pane.top + Math.min(TOP_BAND, root.clientHeight),
            }
        }

        function followScroll() {
            const { scrollable, atBottom, inTopBand } = getPosition()
            setActive(scrollable && (atBottom || inTopBand) ? 'on-screen' : 'overview')
        }

        let intersectionObserver
        function observePane() {
            intersectionObserver?.disconnect()
            if (typeof IntersectionObserver !== 'undefined') {
                intersectionObserver = new IntersectionObserver(([entry]) => {
                    const { scrollable, atBottom } = getPosition()
                    setActive(scrollable && (atBottom || entry.isIntersecting) ? 'on-screen' : 'overview')
                }, {
                    root,
                    rootMargin: `0px 0px -${Math.max(0, root.clientHeight - TOP_BAND)}px 0px`,
                    threshold: 0,
                })
                intersectionObserver.observe(collection)
            }
            followScroll()
        }

        // Also handles the bottom exception, and is the fallback when IO is absent.
        root.addEventListener('scroll', followScroll, { passive: true })
        observePane()
        const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(observePane) : null
        resizeObserver?.observe(root)

        if (window.location.hash === '#on-screen-heading') moveToSection('on-screen')
        else if (window.location.hash === '#about-profile-heading') moveToSection('overview')

        return () => {
            intersectionObserver?.disconnect()
            resizeObserver?.disconnect()
            root.removeEventListener('scroll', followScroll)
        }
    }, [scrollRef, onScreenRef, moveToSection])

    function scrollToSection(event, id) {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
        event.preventDefault()
        moveToSection(id)
    }

    return (
        <nav className="about-section-nav" aria-label="About sections">
            <a href="#about-profile-heading" aria-current={active === 'overview' ? 'location' : undefined}
                onClick={event => scrollToSection(event, 'overview')}>Overview</a>
            <a href="#on-screen-heading" aria-current={active === 'on-screen' ? 'location' : undefined}
                onClick={event => scrollToSection(event, 'on-screen')}>On Screen</a>
        </nav>
    )
}
