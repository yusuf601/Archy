import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { expect, it } from 'vitest'
import DesktopShell from './DesktopShell'

function LocationProbe() {
    const location = useLocation()
    return <output data-testid="location-pathname">{location.pathname}</output>
}

it('opens the About app from the dock', async () => {
    const user = userEvent.setup()
    render(
        <MemoryRouter initialEntries={['/']}>
            <DesktopShell />
            <LocationProbe />
        </MemoryRouter>,
    )

    await user.click(screen.getByRole('button', { name: 'Open About Yusuf' }))

    expect(screen.getByTestId('location-pathname')).toHaveTextContent('/about')
    expect(screen.getByRole('heading', { level: 2, name: 'Muh Yusuf' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open About Yusuf' })).toHaveAttribute('aria-current', 'page')
})

it('routes document apps and toggles the same Kitty instance', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter initialEntries={['/']}><DesktopShell /></MemoryRouter>)

    const dockButtons = screen.getAllByRole('button', { name: /^(Open About Yusuf|Open Projects|Open Firefox|Open Kitty)$/ })
    expect(dockButtons.map((button) => button.getAttribute('aria-label'))).toEqual([
        'Open About Yusuf',
        'Open Projects',
        'Open Firefox',
        'Open Kitty',
    ])
    expect(screen.getByRole('button', { name: 'Open About Yusuf' }).querySelector('img')).toHaveAttribute('src', expect.stringContaining('about-folder'))
    expect(screen.getByRole('button', { name: 'Open Projects' }).querySelector('img')).toHaveAttribute('src', expect.stringContaining('vscode'))
    expect(screen.getByRole('button', { name: 'Open Firefox' }).querySelector('img')).toHaveAttribute('src', expect.stringContaining('firefox'))

    await user.click(screen.getByRole('button', { name: 'Open Projects' }))
    expect(screen.getByRole('heading', { level: 2, name: 'SVector' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open Projects' })).toHaveAttribute('aria-current', 'page')

    await user.click(screen.getByRole('button', { name: 'Open Kitty' }))
    expect(screen.getByTestId('kitty-window')).toBeVisible()
    await user.click(screen.getByRole('button', { name: 'Open Kitty' }))
    expect(screen.getByTestId('kitty-window')).not.toBeVisible()
    expect(screen.getAllByTestId('kitty-window')).toHaveLength(1)
})
