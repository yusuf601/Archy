import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

class TestIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
}

window.IntersectionObserver = TestIntersectionObserver
Element.prototype.scrollIntoView = vi.fn()
// JSDOM has no media playback engine; browser QA covers actual playback.
HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined)
HTMLMediaElement.prototype.pause = vi.fn()

afterEach(() => cleanup())
