import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import DesktopShell from './DesktopShell'

it('routes document apps and toggles the same Kitty instance', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter initialEntries={['/']}><DesktopShell /></MemoryRouter>)

    await user.click(screen.getByRole('button', { name: 'Open Files' }))
    expect(screen.getByRole('heading', { level: 2, name: 'SVector' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open Files' })).toHaveAttribute('aria-current', 'page')

    await user.click(screen.getByRole('button', { name: 'Open Kitty' }))
    expect(screen.getByTestId('kitty-window')).toBeVisible()
    await user.click(screen.getByRole('button', { name: 'Open Kitty' }))
    expect(screen.getByTestId('kitty-window')).not.toBeVisible()
    expect(screen.getAllByTestId('kitty-window')).toHaveLength(1)
})
