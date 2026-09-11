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

    it('renders only the desktop-only landing below the desktop breakpoint', () => {
        render(<MemoryRouter><App /></MemoryRouter>)
        expect(screen.getByRole('heading', { name: 'Built for a larger screen.' })).toBeInTheDocument()
        expect(screen.getByText('This workspace is currently available on desktop only.')).toBeInTheDocument()
        expect(screen.queryByTestId('mobile-portfolio')).not.toBeInTheDocument()
        expect(screen.queryByTestId('desktop-shell')).not.toBeInTheDocument()
        expect(document.querySelector('video')).toBeNull()
    })

    it('renders only the workstation at desktop width', () => {
        setDesktop(true)
        render(<MemoryRouter><App /></MemoryRouter>)
        expect(screen.getByTestId('desktop-shell')).toBeInTheDocument()
        expect(screen.queryByTestId('mobile-portfolio')).not.toBeInTheDocument()
    })
})
