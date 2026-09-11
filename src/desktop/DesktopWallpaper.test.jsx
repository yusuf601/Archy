import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import DesktopShell from './DesktopShell'

let motion

beforeEach(() => {
    vi.clearAllMocks()
    motion = new EventTarget()
    motion.matches = false
    vi.stubGlobal('matchMedia', () => motion)
    vi.spyOn(document, 'visibilityState', 'get').mockReturnValue('visible')
})

afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
})

function openDesktop(path = '/') {
    const view = render(<MemoryRouter initialEntries={[path]}><DesktopShell /></MemoryRouter>)
    const video = view.container.querySelector('video')
    expect(video, 'desktop wallpaper video').not.toBeNull()
    return { ...view, video }
}

it('loops silently and pauses/resumes the same frame when About opens/closes', async () => {
    const user = userEvent.setup()
    const { video, container } = openDesktop()
    expect(video.loop).toBe(true)
    expect(video.muted).toBe(true)
    expect(video.playsInline).toBe(true)
    expect(video).toHaveAttribute('poster', '/wallpapers/forest-workstation.png')
    expect(video.play).toHaveBeenCalledTimes(1)
    video.currentTime = 4
    await user.click(screen.getByRole('button', { name: 'Open About Yusuf' }))
    expect(video.pause).toHaveBeenCalled()
    expect(video.currentTime).toBe(4)
    await user.click(screen.getByRole('button', { name: 'Close About Yusuf' }))
    expect(container.querySelector('video')).toBe(video)
    expect(video.play).toHaveBeenCalledTimes(2)
    expect(video.currentTime).toBe(4)
})

it('starts paused on an app deep link', () => {
    const { video } = openDesktop('/about')
    expect(video.play).not.toHaveBeenCalled()
    expect(video.pause).toHaveBeenCalled()
})

it('pauses for Kitty and resumes when it closes', async () => {
    const user = userEvent.setup()
    const { video } = openDesktop()
    await user.click(screen.getByRole('button', { name: 'Open Kitty' }))
    expect(video.pause).toHaveBeenCalled()
    await user.click(screen.getByRole('button', { name: 'Open Kitty' }))
    expect(video.play).toHaveBeenCalledTimes(2)
})

it('resumes after tab visibility returns, but not while an app remains open', async () => {
    const user = userEvent.setup()
    const { video } = openDesktop()
    const visibility = vi.spyOn(document, 'visibilityState', 'get')
    visibility.mockReturnValue('hidden')
    fireEvent(document, new Event('visibilitychange'))
    expect(video.pause).toHaveBeenCalled()
    visibility.mockReturnValue('visible')
    fireEvent(document, new Event('visibilitychange'))
    expect(video.play).toHaveBeenCalledTimes(2)
    await user.click(screen.getByRole('button', { name: 'Open About Yusuf' }))
    visibility.mockReturnValue('hidden')
    fireEvent(document, new Event('visibilitychange'))
    visibility.mockReturnValue('visible')
    fireEvent(document, new Event('visibilitychange'))
    expect(video.play).toHaveBeenCalledTimes(2)
})

it('uses the static wallpaper for reduced motion and responds to preference changes', () => {
    motion.matches = true
    const { video } = openDesktop()
    expect(video).not.toHaveAttribute('src')
    expect(video.play).not.toHaveBeenCalled()
    act(() => {
        motion.matches = false
        motion.dispatchEvent(new Event('change'))
    })
    expect(video).toHaveAttribute('src', expect.stringContaining('.mp4'))
    expect(video.play).toHaveBeenCalledTimes(1)
})

it('falls back to the static wallpaper if the video fails to load', () => {
    const { video } = openDesktop()
    fireEvent.error(video)
    expect(video).not.toHaveAttribute('src')
    expect(video).toHaveAttribute('poster', '/wallpapers/forest-workstation.png')
    expect(video.pause).toHaveBeenCalled()
})
