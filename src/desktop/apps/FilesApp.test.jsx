import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { expect, it } from 'vitest'
import { DesktopShellProvider } from '../DesktopShellContext'
import FilesApp from './FilesApp'

function renderFilesApp(route) {
    return render(
        <MemoryRouter initialEntries={[route]}>
            <DesktopShellProvider>
                <Routes>
                    <Route path="/projects/:projectId?" element={<FilesApp />} />
                </Routes>
            </DesktopShellProvider>
        </MemoryRouter>,
    )
}

it.each([
    ['/projects/svector', 'SVector'],
    ['/projects/research-notes', 'Research Notes'],
])('opens the selected project for %s', (route, title) => {
    renderFilesApp(route)
    expect(screen.getByRole('heading', { level: 2, name: title })).toBeInTheDocument()
})

it('highlights the selected sidebar item', () => {
    renderFilesApp('/projects/research-notes')
    expect(screen.getByRole('link', { name: /Research Notes/ })).toHaveAttribute('aria-current', 'page')
})

it('keeps the frame visible for an unknown project id and offers a fallback action', async () => {
    const user = userEvent.setup()
    renderFilesApp('/projects/missing-project')
    expect(screen.getByRole('heading', { level: 2, name: 'Project Not Found' })).toBeInTheDocument()
    await user.click(screen.getByRole('link', { name: 'Open SVector' }))
    expect(screen.getByRole('heading', { level: 2, name: 'SVector' })).toBeInTheDocument()
})
