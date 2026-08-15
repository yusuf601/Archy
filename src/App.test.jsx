import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

const setDesktop = (matches) => {
    window.matchMedia = vi.fn().mockImplementation(() => ({
        matches,
        media: '(min-width: 1024px)',
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
    }))
}

describe('responsive application root', () => {
    beforeEach(() => setDesktop(false))

    it('keeps the existing portfolio below the desktop breakpoint', () => {
        render(<MemoryRouter><App /></MemoryRouter>)
        expect(screen.getByTestId('mobile-portfolio')).toBeInTheDocument()
        expect(screen.queryByTestId('desktop-shell')).not.toBeInTheDocument()
    })

    it('renders only the workstation at desktop width', () => {
        setDesktop(true)
        render(<MemoryRouter><App /></MemoryRouter>)
        expect(screen.getByTestId('desktop-shell')).toBeInTheDocument()
        expect(screen.queryByTestId('mobile-portfolio')).not.toBeInTheDocument()
    })
})
