import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import { aboutProfile, aboutSections, onScreenItems } from '../../data/aboutContent'
import { DesktopShellProvider } from '../DesktopShellContext'
import AboutApp from './AboutApp'

function renderAboutApp() {
    return render(
        <MemoryRouter initialEntries={['/about']}>
            <DesktopShellProvider>
                <AboutApp />
            </DesktopShellProvider>
        </MemoryRouter>,
    )
}

it('presents Yusuf profile and current learning focus', () => {
    renderAboutApp()

    expect(screen.getByRole('heading', { level: 2, name: 'Muh Yusuf' })).toBeInTheDocument()
    expect(screen.getByText(/Halu Oleo University/)).toBeInTheDocument()
    expect(screen.getByText('5th semester')).toBeInTheDocument()
    expect(screen.getByText('Computer Vision & Computation')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3, name: 'Current learning' })).toBeInTheDocument()
    expect(screen.getByText('Data science')).toBeInTheDocument()
    expect(screen.getByText('Low-level programming')).toBeInTheDocument()
    expect(screen.getByText('Machine learning')).toBeInTheDocument()
})

it('does not render the legacy categorized stack', () => {
    renderAboutApp()

    for (const heading of ['Languages', 'Systems', 'Data / ML', 'Workflow']) {
        expect(screen.queryByRole('heading', { name: heading })).not.toBeInTheDocument()
    }
})

it('defines curated confirmed profile and On Screen content', () => {
    expect(aboutProfile).toMatchObject({
        name: 'Muh Yusuf',
        university: 'Halu Oleo University',
        semester: '5th semester',
        specialization: 'Computer Vision & Computation',
        currentLearning: ['Data science', 'Low-level programming', 'Machine learning'],
    })
    expect(aboutSections).toEqual([])
    expect(onScreenItems).toEqual(expect.arrayContaining([
        expect.objectContaining({ title: 'The Martian', year: 2015, type: 'film' }),
        expect.objectContaining({ title: 'Leave the World Behind', year: 2023, type: 'film' }),
        expect.objectContaining({ title: 'Cars', year: 2006, type: 'film' }),
        expect.objectContaining({ title: 'Reply 1988', year: 2015, type: 'series' }),
        expect.objectContaining({ title: 'FROM', year: 2022, type: 'series' }),
        expect.objectContaining({ title: 'The Night Agent', year: 2023, type: 'series' }),
    ]))
    expect(onScreenItems).toHaveLength(6)
})
