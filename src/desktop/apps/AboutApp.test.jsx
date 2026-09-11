import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import { DesktopShellProvider } from '../DesktopShellContext'
import AboutApp from './AboutApp'

function renderAboutApp() {
    return render(<MemoryRouter initialEntries={['/about']}><DesktopShellProvider><AboutApp /></DesktopShellProvider></MemoryRouter>)
}

it('presents the approved personal identity, education and study information', () => {
    renderAboutApp()
    expect(screen.getByText('Muh Yusuf')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Hi, I’m Yusuf.', level: 2 })).toBeInTheDocument()
    for (const value of ['Informatics student', 'Halu Oleo University', 'Informatics Engineering', '5th semester']) {
        expect(screen.getByText(value)).toBeInTheDocument()
    }
    for (const topic of ['Computer Vision', 'Computation', 'Systems', 'Data Science', 'Low-level programming', 'Machine Learning']) {
        expect(screen.getByText(topic)).toBeInTheDocument()
    }
    expect(screen.getByRole('heading', { name: 'Currently learning' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'About Yusuf content' })).toHaveAttribute('tabindex', '0')
    expect(screen.getByRole('button', { name: 'Close About Yusuf' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', 'https://www.linkedin.com/in/muh-yusuf-7154b7204')
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/yusuf601')
})

it('removes the sidebar, portrait and rejected content while keeping favorite media', () => {
    renderAboutApp()
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
    expect(screen.getAllByRole('img')).toHaveLength(6)
    for (const value of ['Films', 'Series', 'The Martian', 'Reply 1988', 'Away from the keyboard']) {
        expect(screen.getByText(value)).toBeInTheDocument()
    }
    for (const value of ['On Screen', 'Arch Linux', 'Daily driver', 'Favorite films & series']) {
        expect(screen.queryByText(value)).not.toBeInTheDocument()
    }
    expect(screen.queryByRole('link', { name: /projects/i })).not.toBeInTheDocument()
})
