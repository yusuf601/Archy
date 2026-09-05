import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, expect, it, vi } from 'vitest'
import { DesktopShellProvider } from '../DesktopShellContext'
import AboutApp from './AboutApp'

const { mockAboutSections } = vi.hoisted(() => ({ mockAboutSections: [] }))

vi.mock('../../data/aboutContent', async (importOriginal) => ({
    ...await importOriginal(),
    aboutSections: mockAboutSections,
}))

afterEach(() => mockAboutSections.splice(0))

function renderAboutApp() {
    return render(
        <MemoryRouter initialEntries={['/about']}>
            <DesktopShellProvider>
                <AboutApp />
            </DesktopShellProvider>
        </MemoryRouter>,
    )
}

it('presents the profile document with local identity images', () => {
    renderAboutApp()

    expect(screen.getByRole('heading', { name: 'Profile' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'Muh Yusuf' })).toBeInTheDocument()
    expect(screen.getByText(/Halu Oleo University/)).toBeInTheDocument()
    expect(screen.getByText('5th semester')).toBeInTheDocument()
    expect(screen.getByText('Computer Vision & Computation')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Currently learning' })).toBeInTheDocument()
    expect(screen.getByText('Data science')).toBeInTheDocument()
    expect(screen.getByText('Low-level programming')).toBeInTheDocument()
    expect(screen.getByText('Machine learning')).toBeInTheDocument()

    expect(screen.getByRole('img', { name: 'Pixel-art portrait of Muh Yusuf' })).toHaveAttribute(
        'src',
        '/avatar.png',
    )
    expect(screen.getByRole('img', { name: 'Halu Oleo University logo' })).toHaveAttribute(
        'src',
        expect.stringContaining('halu-oleo-logo'),
    )
})

it('renders a personal section without unapproved subsections or the legacy stack', () => {
    renderAboutApp()

    expect(document.querySelector('.about-personal-section')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'On Screen' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Currently' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Outside the Stack' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Small Things' })).not.toBeInTheDocument()
    expect(screen.queryByText('Builds with')).not.toBeInTheDocument()

    for (const heading of ['Languages', 'Systems', 'Data / ML', 'Workflow']) {
        expect(screen.queryByRole('heading', { name: heading })).not.toBeInTheDocument()
    }
})

it('omits optional sections when either heading or copy is blank', () => {
    mockAboutSections.push(
        { heading: '', copy: 'Copy with no heading' },
        { heading: '   ', copy: 'Copy with a whitespace heading' },
        { heading: 'Heading with no copy', copy: '' },
        { heading: 'Heading with whitespace copy', copy: '   ' },
    )

    renderAboutApp()

    expect(document.querySelectorAll('.about-personal-section > .about-section')).toHaveLength(0)
})
