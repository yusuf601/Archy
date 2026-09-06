import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, expect, it, vi } from 'vitest'
import { DesktopShellProvider } from '../DesktopShellContext'
import AboutApp from './AboutApp'

afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    delete Element.prototype.scrollTo
    window.history.replaceState(null, '', '/')
})

function renderAboutApp() {
    return render(
        <MemoryRouter initialEntries={['/about']}>
            <DesktopShellProvider>
                <AboutApp />
            </DesktopShellProvider>
        </MemoryRouter>,
    )
}

it('shows only the approved profile and two navigation destinations', () => {
    renderAboutApp()
    const nav = screen.getByRole('navigation', { name: 'About sections' })
    expect(within(nav).getAllByRole('link').map(link => link.textContent)).toEqual(['Overview', 'On Screen'])
    expect(screen.getByRole('heading', { name: 'Muh Yusuf', level: 2 })).toBeInTheDocument()
    for (const value of ['Informatics student', 'Halu Oleo University', 'Informatics Engineering',
        '5th semester', 'Computer Vision', 'Computation', 'Systems', 'Data Science',
        'Low-level programming', 'Machine Learning']) {
        expect(screen.getByText(value)).toBeInTheDocument()
    }
    expect(screen.getByRole('heading', { name: 'Interests' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Currently Learning' })).toBeInTheDocument()
    expect(screen.getAllByRole('img', { name: 'Pixel-art portrait of Muh Yusuf' })).toHaveLength(1)
    expect(screen.getByRole('img', { name: 'Pixel-art portrait of Muh Yusuf' })).toHaveAttribute('src', '/avatar.png')
    expect(screen.getByRole('img', { name: 'Halu Oleo University logo' })).toHaveAttribute('src', expect.stringContaining('halu-oleo-logo'))
    expect(screen.queryByRole('link', { name: /projects/i })).not.toBeInTheDocument()
})

it('never displays unapproved personal prose or system information', () => {
    renderAboutApp()
    for (const value of ['Arch Linux', 'Daily driver', 'Yusuf’s desk', 'A personal workspace',
        'A little about me', 'Hey, I’m', 'An informatics student exploring how computers see, learn, and work.',
        'Computer Vision & Computation', 'Builds with']) {
        expect(screen.queryByText(value)).not.toBeInTheDocument()
    }
    for (const name of ['Profile', 'Currently', 'Outside the Stack', 'Small Things', 'Languages', 'Systems', 'Data / ML', 'Workflow']) {
        expect(screen.queryByRole('heading', { name })).not.toBeInTheDocument()
    }
})

// JSDOM has no layout engine or element scrollTo. Supply pane geometry while
// exercising the real navigation, focus, state updates, and event cleanup.
function mockPaneGeometry({ height = 400, contentHeight = 1600, collectionTop = 700 } = {}) {
    vi.spyOn(Element.prototype, 'clientHeight', 'get').mockImplementation(function () {
        return this.classList.contains('about-reading-pane') ? height : 0
    })
    vi.spyOn(Element.prototype, 'scrollHeight', 'get').mockImplementation(function () {
        return this.classList.contains('about-reading-pane') ? contentHeight : 0
    })
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function () {
        const root = document.querySelector('.about-reading-pane')
        if (this === root) return { top: 100, bottom: 100 + height }
        if (this.querySelector?.('#on-screen-heading')) {
            return { top: 100 + collectionTop - root.scrollTop, bottom: 100 + contentHeight - root.scrollTop }
        }
        return { top: 100, bottom: 200 }
    })
    const scrollTo = vi.fn(function ({ top }) { this.scrollTop = top })
    vi.stubGlobal('ResizeObserver', undefined)
    Object.defineProperty(Element.prototype, 'scrollTo', { configurable: true, value: scrollTo })
    return scrollTo
}

it('scrolls the reading pane to heading anchors and focuses their headings', () => {
    const scrollTo = mockPaneGeometry()
    renderAboutApp()
    const root = screen.getByRole('region', { name: 'About Yusuf content' })
    expect(root).toHaveAttribute('tabindex', '0')
    const onScreen = screen.getByRole('link', { name: 'On Screen' })
    expect(onScreen).toHaveAttribute('href', '#on-screen-heading')
    fireEvent.click(onScreen)
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 676, behavior: 'auto' })
    expect(screen.getByRole('heading', { name: 'On Screen', level: 2 })).toHaveFocus()
    expect(onScreen).toHaveAttribute('aria-current', 'location')
    fireEvent.click(screen.getByRole('link', { name: 'Overview' }))
    expect(scrollTo).toHaveBeenLastCalledWith({ top: 0, behavior: 'auto' })
    expect(screen.getByRole('heading', { name: 'Muh Yusuf' })).toHaveFocus()
    expect(screen.getByRole('link', { name: 'Overview' })).toHaveAttribute('aria-current', 'location')
})

it('preserves modified link activation', () => {
    const scrollTo = mockPaneGeometry()
    renderAboutApp()
    const link = screen.getByRole('link', { name: 'On Screen' })
    for (const modifiers of [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }]) {
        expect(fireEvent.click(link, modifiers)).toBe(true)
    }
    expect(scrollTo).not.toHaveBeenCalled()
})

it('follows manual pane scrolling without IntersectionObserver and exits the bottom exception', () => {
    mockPaneGeometry({ contentHeight: 1000, collectionTop: 800 })
    vi.stubGlobal('IntersectionObserver', undefined)
    const { unmount } = renderAboutApp()
    const root = screen.getByRole('region', { name: 'About Yusuf content' })
    const overview = screen.getByRole('link', { name: 'Overview' })
    const onScreen = screen.getByRole('link', { name: 'On Screen' })
    expect(overview).toHaveAttribute('aria-current', 'location')
    root.scrollTop = 600
    fireEvent.scroll(root)
    expect(onScreen).toHaveAttribute('aria-current', 'location')
    root.scrollTop = 590
    fireEvent.scroll(root)
    expect(overview).toHaveAttribute('aria-current', 'location')
    const remove = vi.spyOn(root, 'removeEventListener')
    unmount()
    expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function))
})

it('keeps a non-scrollable document at Overview', () => {
    mockPaneGeometry({ height: 1200, contentHeight: 1000, collectionTop: 50 })
    renderAboutApp()
    expect(screen.getByRole('link', { name: 'Overview' })).toHaveAttribute('aria-current', 'location')
})

it('honors an initial heading hash after refs attach', () => {
    const scrollTo = mockPaneGeometry()
    window.history.replaceState(null, '', '/about#on-screen-heading')
    renderAboutApp()
    expect(scrollTo).toHaveBeenCalledWith({ top: 676, behavior: 'auto' })
    expect(screen.getByRole('heading', { name: 'On Screen', level: 2 })).toHaveFocus()
    expect(window.location.pathname).toBe('/about')
})

it('observes the pane top band and rebuilds observers when its height changes', () => {
    mockPaneGeometry()
    const observations = []
    let onResize
    const resizeDisconnect = vi.fn()
    vi.stubGlobal('IntersectionObserver', class {
        constructor(callback, options) {
            this.callback = callback
            this.options = options
            this.disconnect = vi.fn()
            observations.push(this)
        }
        observe(target) { this.target = target }
    })
    vi.stubGlobal('ResizeObserver', class {
        constructor(callback) { onResize = callback }
        observe() {}
        disconnect = resizeDisconnect
    })
    const { unmount } = renderAboutApp()
    const root = screen.getByRole('region', { name: 'About Yusuf content' })
    expect(observations[0].options).toMatchObject({ root, rootMargin: '0px 0px -304px 0px' })
    act(() => observations[0].callback([{ target: observations[0].target, isIntersecting: true }]))
    expect(screen.getByRole('link', { name: 'On Screen' })).toHaveAttribute('aria-current', 'location')
    Object.defineProperty(root, 'clientHeight', { value: 600 })
    act(() => onResize())
    expect(observations[0].disconnect).toHaveBeenCalled()
    expect(observations[1].options.rootMargin).toBe('0px 0px -504px 0px')
    unmount()
    expect(observations[1].disconnect).toHaveBeenCalled()
    expect(resizeDisconnect).toHaveBeenCalled()
})
