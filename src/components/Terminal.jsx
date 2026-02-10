import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Terminal = ({ onModeChange }) => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        { type: 'output', text: 'Welcome to the portfolio terminal. Type "help" for available commands.' }
    ]);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);
    const historyEndRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const commands = {
        help: () => ({
            type: 'output',
            text: `Available commands:
  help          - Show this help message
  ls            - List available pages
  cd [path]     - Navigate to page (blog, projects, contact, home, ..)
  pwd           - Print current directory
  whoami        - Display current user
  hostname      - Show system hostname
  uname [-r]    - Print system information
  date          - Display current date and time
  uptime        - Show system uptime
  echo [text]   - Display a line of text
  cat [file]    - Display file contents
  neofetch      - Display system information
  clear         - Clear terminal history`
        }),
        ls: () => ({
            type: 'output',
            text: `main.cpp    blog/    projects/    contact.txt`
        }),
        pwd: () => ({
            type: 'output',
            text: `/home/guest${location.pathname === '/' ? '' : location.pathname}`
        }),
        whoami: () => ({
            type: 'output',
            text: 'guest'
        }),
        hostname: () => ({
            type: 'output',
            text: 'yusuf-portfolio'
        }),
        uname: (args) => {
            if (args[0] === '-r') {
                return {
                    type: 'output',
                    text: '6.x (Zen)'
                };
            }
            return {
                type: 'output',
                text: 'Linux yusuf-portfolio 6.x (Zen) x86_64 GNU/Linux'
            };
        },
        date: () => {
            const now = new Date();
            return {
                type: 'output',
                text: now.toString()
            };
        },
        uptime: () => ({
            type: 'output',
            text: '21 years, 4 months - building efficient software solutions.'
        }),
        echo: (args) => ({
            type: 'output',
            text: args.join(' ')
        }),
        cat: (args) => {
            const file = args[0];
            const files = {
                'main.cpp': `// Muh Yusuf - Portfolio
#include <iostream>
#include <string>

int main() {
    std::cout << "Hi, I'm Muh Yusuf" << std::endl;
    std::cout << "Competitive Programmer | AI Enthusiast" << std::endl;
    std::cout << "Focus: Low-Level Systems & Algorithms" << std::endl;
    return 0;
}`,
                'contact.txt': `Email: yusufmuhyusuh@gmail.com
GitHub: github.com/yusuf601
LinkedIn: linkedin.com/in/muh-yusuf-7154b7204
Location: Makassar, Indonesia`,
                'README.md': `# Muh Yusuf - Portfolio

Terminal-style portfolio showcasing competitive programming,
AI research, and low-level systems expertise.

Built with React + Vite | Everblush Theme`
            };

            if (!file) {
                return {
                    type: 'error',
                    text: 'cat: missing operand'
                };
            }

            if (files[file]) {
                return {
                    type: 'output',
                    text: files[file]
                };
            }

            return {
                type: 'error',
                text: `cat: ${file}: No such file or directory`
            };
        },
        neofetch: () => ({
            type: 'output',
            text: `       ___           guest@yusuf-portfolio
      (.. |          ----------------------
      (<> |          OS: CachyOS (Arch-based)
     / __  \\         Host: Universitas Halu Oleo
    ( /  \\ /|        Kernel: Linux 6.x (Zen)
   _/\\ __)/_)        IDE: Neovim (NvChad)
   \\/-____\\/         Shell: zsh
                     Focus: AI & Low-Level Systems
                     Uptime: 21 years
                     Semester: 4`
        }),
        cd: (args) => {
            const target = args[0];

            // Map of valid paths
            const pathMap = {
                'blog': '/blog',
                'projects': '/projects',
                'contact': '/contact',
                'home': '/',
                '~': '/',
                '..': '/',
            };

            if (!target) {
                return {
                    type: 'output',
                    text: 'cd: missing operand'
                };
            }

            if (pathMap[target]) {
                navigate(pathMap[target]);
                return {
                    type: 'output',
                    text: `Navigating to ${target}...`
                };
            }

            return {
                type: 'error',
                text: `cd: ${target}: No such file or directory`
            };
        },
        clear: () => null
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add command to history
        const newHistory = [...history, { type: 'command', text: input }];

        // Parse command
        const parts = input.trim().split(' ');
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        if (cmd === 'clear') {
            setHistory([]);
        } else if (commands[cmd]) {
            const result = commands[cmd](args);
            if (result) {
                newHistory.push(result);
            }
            setHistory(newHistory);
        } else {
            newHistory.push({
                type: 'error',
                text: `Command not found: ${cmd}. Type "help" for available commands.`
            });
            setHistory(newHistory);
        }

        setInput('');
    };

    const handleFocus = () => {
        setIsFocused(true);
        onModeChange('INSERT');
    };

    const handleBlur = () => {
        setIsFocused(false);
        onModeChange('NORMAL');
    };

    useEffect(() => {
        historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    // Get current path for prompt
    const getCurrentPath = () => {
        const path = location.pathname;
        if (path === '/') return '~';
        return `~${path}`;
    };

    return (
        <div className="bg-everblush-bg border-t border-everblush-green/30 p-4 font-mono text-sm max-h-64 overflow-y-auto">
            {/* Terminal History */}
            <div className="space-y-2 mb-2">
                {history.map((entry, index) => (
                    <div key={index}>
                        {entry.type === 'command' && (
                            <div className="text-everblush-green">
                                <span className="text-everblush-blue">guest@yusuf</span>
                                <span className="text-everblush-fg">:</span>
                                <span className="text-everblush-blue">{getCurrentPath()}</span>
                                <span className="text-everblush-green">$</span> {entry.text}
                            </div>
                        )}
                        {entry.type === 'output' && (
                            <div className="text-everblush-fg/80 whitespace-pre-line pl-4">
                                {entry.text}
                            </div>
                        )}
                        {entry.type === 'error' && (
                            <div className="text-everblush-red pl-4">
                                {entry.text}
                            </div>
                        )}
                    </div>
                ))}
                <div ref={historyEndRef} />
            </div>

            {/* Input Line */}
            <form onSubmit={handleSubmit} className="flex items-center">
                <span className="text-everblush-blue">guest@yusuf</span>
                <span className="text-everblush-fg">:</span>
                <span className="text-everblush-blue">{getCurrentPath()}</span>
                <span className="text-everblush-green">$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    className="flex-1 ml-2 bg-transparent outline-none text-everblush-fg caret-everblush-green"
                    autoComplete="off"
                    spellCheck="false"
                />
            </form>
        </div>
    );
};

export default Terminal;
