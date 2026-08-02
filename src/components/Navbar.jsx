import React, { useState } from 'react';

const Navbar = ({ onTerminalToggle, terminalOpen }) => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    const handleNavClick = () => setMobileOpen(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 border-b border-[var(--border-light)]"
            style={{ background: 'var(--bg-navbar)', backdropFilter: 'blur(8px)' }}
        >
            <div className="w-full px-6 h-12 flex items-center">
                {/* Brand — always far left */}
                <a
                    href="#home"
                    className="text-sm font-bold text-[var(--accent-info)] shrink-0"
                    onClick={handleNavClick}
                >
                    yusuf.cpp
                </a>

                {/* Desktop nav — pushed to far right via ml-auto */}
                <div className="hidden md:flex items-center gap-6 ml-auto">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                    <button
                        onClick={onTerminalToggle}
                        className={`text-xs px-3 py-1 border rounded transition-colors ${terminalOpen
                                ? 'border-[var(--accent-success)] text-[var(--accent-success)]'
                                : 'border-[var(--border-light)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-secondary)]'
                            }`}
                    >
                        &gt;_ terminal
                    </button>
                </div>

                {/* Mobile — hamburger pushed to far right */}
                <button
                    className="md:hidden ml-auto text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    onClick={() => setMobileOpen(o => !o)}
                    aria-label="Toggle menu"
                >
                    {mobileOpen ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile drawer */}
            {mobileOpen && (
                <div className="md:hidden border-t border-[var(--border-light)]"
                    style={{ background: 'var(--bg-navbar)' }}
                >
                    <div className="flex flex-col px-6 py-4 gap-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                                onClick={handleNavClick}
                            >
                                {link.name}
                            </a>
                        ))}
                        <button
                            onClick={() => { onTerminalToggle(); setMobileOpen(false); }}
                            className={`text-sm text-left transition-colors ${terminalOpen ? 'text-[var(--accent-success)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                }`}
                        >
                            &gt;_ terminal
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
