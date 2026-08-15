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

afterEach(() => cleanup())
