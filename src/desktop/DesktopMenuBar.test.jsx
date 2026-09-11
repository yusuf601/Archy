import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { expect, it } from 'vitest'
import DesktopShell from './DesktopShell'

it('shows simulated workstation widgets and working menu actions', async () => {
    const user = userEvent.setup()

    render(<MemoryRouter initialEntries={['/projects']}><DesktopShell /></MemoryRouter>)

    expect(screen.getAllByTitle('simulated workstation telemetry')[0]).toHaveTextContent('CPU 17%')
    expect(screen.getByText(/RAM 4.89 GiB/)).toBeInTheDocument()
    expect(screen.getByText(/Storage 318.67 GB/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Yusuf menu' }))
    expect(screen.getByRole('menuitem', { name: 'Resume' })).toHaveAttribute('href', '/MuhYusuf_Resume.pdf')
    expect(screen.getByRole('menuitem', { name: 'GitHub' })).toHaveAttribute('href', 'https://github.com/yusuf601')

    await user.click(screen.getByRole('button', { name: 'Control Center' }))
    await user.click(screen.getByRole('button', { name: 'Shutdown' }))
    expect(screen.getByTestId('desktop-shell')).toHaveAttribute('data-active-app', 'desktop')
    await user.click(screen.getByRole('button', { name: 'Power on' }))
})

it('toggles simulated radios, supports dismissal, and wakes without closing the app', async () => {
    const user = userEvent.setup()
    render(<MemoryRouter initialEntries={['/projects']}><DesktopShell /></MemoryRouter>)
    const trigger = screen.getByRole('button', { name: 'Control Center' })
    await user.click(trigger)
    const wifi = screen.getByRole('button', { name: /Wi-Fi/ })
    expect(wifi).toHaveFocus()
    expect(wifi).toHaveAttribute('aria-pressed', 'true')
    await user.click(screen.getByRole('button', { name: /Airplane mode/ }))
    expect(wifi).toHaveAttribute('aria-pressed', 'false')
    await user.click(wifi)
    expect(screen.getByRole('button', { name: /Airplane mode/ })).toHaveAttribute('aria-pressed', 'false')
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog', { name: 'Control Center' })).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
    await user.click(trigger)
    await user.click(screen.getByRole('button', { name: 'Sleep' }))
    expect(screen.getByRole('button', { name: 'Wake desktop' })).toHaveFocus()
    await user.click(screen.getByRole('button', { name: 'Wake desktop' }))
    expect(screen.getByRole('button', { name: 'Open Projects' })).toHaveAttribute('aria-current', 'page')
    expect(trigger).toHaveFocus()
    await user.click(trigger)
    await user.click(screen.getByRole('button', { name: /Dark mode/ }))
    expect(screen.getByTestId('desktop-shell')).toHaveAttribute('data-theme', 'dark')
    await user.click(screen.getByRole('button', { name: /Do not disturb/ }))
    expect(screen.getByTestId('desktop-shell')).toHaveAttribute('data-quiet', 'true')
    await user.click(trigger)
    expect(screen.queryByRole('dialog', { name: 'Control Center' })).not.toBeInTheDocument()
    await user.click(trigger)
    await user.click(screen.getByRole('button', { name: /Fullscreen/ }))
    expect(screen.getByRole('status')).toHaveTextContent('Fullscreen is unavailable')
    await user.click(document.body)
    expect(screen.queryByRole('dialog', { name: 'Control Center' })).not.toBeInTheDocument()
})
