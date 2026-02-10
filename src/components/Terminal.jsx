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
