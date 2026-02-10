import React from 'react';

const Navbar = () => {
    const navLinks = [
        { name: './home', href: '#home' },
        { name: './projects', href: '#projects' },
        { name: './blog', href: '#blog' },
        { name: './contact', href: '#contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-everblush-bg border-b border-everblush-green/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Left Side - Terminal Prompt Logo */}
                    <div className="flex items-center space-x-0 font-mono text-sm sm:text-base">
                        <span className="text-everblush-green font-semibold">yusuf</span>
                        <span className="text-everblush-fg">@</span>
                        <span className="text-everblush-green font-semibold">uho</span>
                        <span className="text-everblush-fg">:~$</span>
                    </div>

                    {/* Right Side - Navigation Links */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="px-3 py-1 text-xs sm:text-sm font-mono text-everblush-fg 
                         hover:bg-everblush-green hover:text-everblush-bg 
                         transition-all duration-200 border border-transparent 
                         hover:border-everblush-green rounded"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
