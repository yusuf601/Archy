import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import DesktopShell from './DesktopShell'

it('keeps one terminal session when Kitty is hidden and reopened', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter><DesktopShell /></MemoryRouter>)

    await user.keyboard('{Control>}j{/Control}')
    const input = screen.getByLabelText('Terminal command')
    await user.type(input, 'echo persistent-session{Enter}')
    expect(screen.getByText('persistent-session')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.getByTestId('kitty-window')).not.toBeVisible()
    await user.keyboard('{Control>}j{/Control}')
    expect(screen.getByText('persistent-session')).toBeInTheDocument()
    expect(screen.getAllByTestId('kitty-window')).toHaveLength(1)
})
