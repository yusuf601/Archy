import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, it } from 'vitest'
import Terminal from './Terminal'

beforeEach(() => {
    const storage = new Map()
    Object.defineProperty(window, 'localStorage', {
        configurable: true,
        value: {
            getItem: (key) => storage.get(key) ?? null,
            setItem: (key, value) => storage.set(key, String(value)),
            removeItem: (key) => storage.delete(key),
            clear: () => storage.clear(),
        },
    })
})

it('guides a player from the CTF quest into the first recon clue', async () => {
    const user = userEvent.setup()

    render(<Terminal isOpen onToggle={() => {}} />)

    const command = screen.getByRole('textbox', { name: 'Terminal command' })
    await user.type(command, 'quest')
    await user.keyboard('{Enter}')
    expect(screen.getByText(/ARCHIVE BREACH PROTOCOL/)).toBeInTheDocument()

    await user.type(command, 'find / -name flag.txt')
    await user.keyboard('{Enter}')
    expect(screen.getByText(/ARCHIVE BEACON DISCOVERED/)).toBeInTheDocument()
})

it('unlocks the archive flag only after the CTF recon sequence', async () => {
    const user = userEvent.setup()

    render(<Terminal isOpen onToggle={() => {}} />)

    const command = screen.getByRole('textbox', { name: 'Terminal command' })
    for (const value of [
        'find / -name flag.txt',
        'scan --target archy.local',
        'ssh archivist@archy.local',
        'cat /.archive/first-contact.flag',
    ]) {
        await user.type(command, value)
        await user.keyboard('{Enter}')
    }

    expect(screen.getByText(/FLAG\{archivist_signal_restored\}/)).toBeInTheDocument()
})

it('restores a discovered archive beacon when the terminal is reopened', async () => {
    const user = userEvent.setup()
    const firstTerminal = render(<Terminal isOpen onToggle={() => {}} />)
    const firstCommand = screen.getByRole('textbox', { name: 'Terminal command' })

    await user.type(firstCommand, 'find / -name flag.txt')
    await user.keyboard('{Enter}')
    firstTerminal.unmount()

    render(<Terminal isOpen onToggle={() => {}} />)
    const reopenedCommand = screen.getByRole('textbox', { name: 'Terminal command' })
    await user.type(reopenedCommand, 'quest')
    await user.keyboard('{Enter}')

    expect(screen.getByText(/Stage 2\/4 — Service mapping/)).toBeInTheDocument()
})

it('uses Yusuf’s two-line CachyOS prompt on desktop', () => {
    render(<Terminal appearance="desktop" isOpen onToggle={() => {}} />)

    const prompt = screen.getByTestId('desktop-terminal-prompt')
    expect(prompt).toHaveTextContent('King Yusuf')
    expect(prompt).toHaveTextContent('cachyos')
    expect(prompt).toHaveTextContent('Archy')
    expect(prompt).toHaveTextContent('v26.7.0')
})
