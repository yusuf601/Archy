import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AchievementToast from './AchievementToast';

const Terminal = ({ onModeChange }) => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        {
            type: 'output',
            text: `Welcome to the portfolio terminal. Type "help" for available commands.

💡 Tip: This terminal has 30 hidden Easter eggs! Try exploring beyond the basics.
    Hint: What happens if you try to get root access? 🔐
    Type 'hint' for clues or 'achievements' to track your progress!`
        }
    ]);
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [isFocused, setIsFocused] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [sudoAttempts, setSudoAttempts] = useState(0);
    const [securityLog, setSecurityLog] = useState([]);
    const [easterEggsFound, setEasterEggsFound] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [hintsUsed, setHintsUsed] = useState(0);
    const [sessionStartTime] = useState(Date.now());
    const inputRef = useRef(null);
    const historyEndRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Easter egg metadata
    const easterEggData = {
        'sudo_rm': { title: 'Destructive Tendencies', description: 'Tried to delete everything!' },
        'sudo_reboot': { title: 'Reboot Attempt', description: 'Wanted to restart the system' },
        'xkcd_sandwich': { title: 'XKCD Fan', description: 'sudo make me a sandwich!' },
        'shellshock': { title: 'Security Researcher', description: 'Tested for Shellshock' },
        'heartbleed': { title: 'CVE Hunter', description: 'Checked for Heartbleed' },
        'meltdown': { title: 'CPU Exploiter', description: 'Tested for Meltdown' },
        'spectre': { title: 'Speculative Execution', description: 'Checked for Spectre' },
        'nmap': { title: 'Network Scanner', description: 'Ran nmap scan' },
        'metasploit': { title: 'Pentester', description: 'Launched Metasploit' },
        'hydra': { title: 'Password Cracker', description: 'Used Hydra' },
        'sqlmap': { title: 'SQL Injector', description: 'Ran SQLMap' },
        'burpsuite': { title: 'Web Hacker', description: 'Started Burp Suite' },
        'wireshark': { title: 'Packet Sniffer', description: 'Captured packets' },
        'rm_rf': { title: 'Careful There!', description: 'Blocked dangerous command' },
        'chmod_777': { title: 'Permission Chaos', description: 'Tried chmod 777 /' },
        'dd': { title: 'Disk Destroyer', description: 'Attempted dd command' },
        'fork_bomb': { title: 'Fork Bomb Expert', description: 'Classic attack detected!' },
        'secret_files': { title: 'Hidden Files', description: 'Found the .secret directory' },
        'backdoor': { title: 'Backdoor Hunter', description: 'Discovered backdoor.sh' },
        'flag': { title: 'CTF Master', description: 'Captured the flag!' },
        'hack_planet': { title: 'Hacker Movies', description: 'Hack the planet!' },
        'matrix': { title: 'Red Pill', description: 'Entered the Matrix' },
        'cowsay': { title: 'Moo!', description: 'Made the cow speak' },
        'sl': { title: 'Train Enthusiast', description: 'Ran the steam locomotive' },
        'fortune': { title: 'Fortune Teller', description: 'Got your fortune' },
        'dijkstra': { title: 'Graph Theory', description: 'Shortest path algorithm' },
        'quicksort': { title: 'Sorting Master', description: 'Quick sort joke' },
        'binarysearch': { title: 'Binary Search', description: 'Divide and conquer' },
        'konami': { title: 'Konami Code', description: 'Up up down down...' },
        'xyzzy': { title: 'Adventure Game', description: 'Classic text adventure' }
    };

    // Helper function to log security events
    const logSecurityEvent = (event) => {
        const timestamp = new Date().toLocaleString();
        setSecurityLog(prev => [...prev, { timestamp, event }]);
    };

    // Helper function to track Easter egg discoveries
    const discoverEasterEgg = (eggName) => {
        if (!easterEggsFound.includes(eggName)) {
            const newEggsFound = [...easterEggsFound, eggName];
            setEasterEggsFound(newEggsFound);

            // Show achievement toast
            const eggInfo = easterEggData[eggName];
            if (eggInfo) {
                const achievement = {
                    title: eggInfo.title,
                    description: eggInfo.description,
                    count: newEggsFound.length
                };
                setAchievements(prev => [...prev, achievement]);
            }

            // Check for milestones
            if (newEggsFound.length === 10) {
                setTimeout(() => {
                    setHistory(prev => [...prev, {
                        type: 'output',
                        text: '🎊 MILESTONE! You\'ve found 10 Easter eggs! Keep going!'
                    }]);
                }, 500);
            } else if (newEggsFound.length === 20) {
                setTimeout(() => {
                    setHistory(prev => [...prev, {
                        type: 'output',
                        text: '🔥 AMAZING! 20 Easter eggs found! You\'re unstoppable!'
                    }]);
                }, 500);
            } else if (newEggsFound.length === 30) {
                setTimeout(() => {
                    setHistory(prev => [...prev, {
                        type: 'output',
                        text: `🏆 PERFECT SCORE! You found all 30 Easter eggs!
You're a true explorer and hacker at heart! 🎉

Congratulations! You've discovered every hidden secret in this terminal.
Share your achievement: "I found all 30 Easter eggs in @yusuf601's portfolio!"`
                    }]);
                }, 500);
            }
        }
    };

    // Dismiss achievement toast
    const dismissAchievement = (index) => {
        setAchievements(prev => prev.filter((_, i) => i !== index));
    };

    // Global keyboard shortcuts
    useEffect(() => {
        const handleGlobalKeyDown = (e) => {
            // Ctrl+` (backtick) - Toggle terminal
            if (e.ctrlKey && e.key === '`') {
                e.preventDefault();
                setIsMinimized(prev => !prev);
                if (isMinimized) {
                    // Focus input when expanding
                    setTimeout(() => inputRef.current?.focus(), 100);
                }
            }

            // Ctrl+L - Clear terminal (when focused)
            if (e.ctrlKey && e.key === 'l' && isFocused) {
                e.preventDefault();
                setHistory([]);
            }

            // Esc - Blur terminal
            if (e.key === 'Escape' && isFocused) {
                e.preventDefault();
                inputRef.current?.blur();
            }
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [isMinimized, isFocused]);

    const commands = {
        help: () => ({
            type: 'output',
            text: `Available commands:
  help          - Show this help message
  ls [-la]      - List available pages
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
  clear         - Clear terminal history
  hint          - Get a clue about hidden Easter eggs
  achievements  - View your Easter egg progress

Try exploring! There might be hidden commands... 👀`
        }),

        hint: () => {
            const hints = [
                "Try common Linux commands you'd use on a real system...",
                "What happens if you try to get root access? 🔐",
                "Security researchers: Test for known vulnerabilities (CVE references)",
                "Pentesters: Your favorite tools might be here... nmap? metasploit?",
                "Found a .secret directory? Explore what's inside! 🕵️",
                "Classic hacker movie references are hidden throughout",
                "Competitive programmers: Try typing algorithm names!",
                "Try being destructive (don't worry, nothing will break! 😄)",
                "XKCD fans will find something familiar...",
                "Retro gamers: Classic references await",
                "Have you tried all the CVE exploits? Shellshock, Heartbleed...",
                "Network scanning tools might work here...",
                "Password cracking tools? SQL injection? Give them a try!",
                "Check for hidden files with 'ls -la'",
                "What's in that .secret directory? Use 'cat' to find out!",
                "Try running pentesting tools like hydra, sqlmap, burpsuite",
                "Classic Unix commands might have surprises: fortune, cowsay, sl",
                "Algorithm enthusiasts: dijkstra, quicksort, binarysearch",
                "Old school gaming: konami code? Adventure game references?",
                "Matrix fans might find something... red pill or blue pill?"
            ];

            const progressHints = [
                { min: 0, max: 0, hint: "You haven't found any Easter eggs yet! Start with basic commands and see what happens..." },
                { min: 1, max: 5, hint: "Nice start! You've found a few. Try exploring security tools and exploits..." },
                { min: 6, max: 10, hint: "You're getting warmed up! Don't forget about hidden files and directories..." },
                { min: 11, max: 15, hint: "Halfway there! Have you tried all the pentesting tools?" },
                { min: 16, max: 20, hint: "Impressive progress! Check out algorithm commands and pop culture references..." },
                { min: 21, max: 25, hint: "Almost there! You're missing just a few. Try everything you can think of!" },
                { min: 26, max: 29, hint: "SO CLOSE! You've found almost all of them. Think outside the box!" }
            ];

            const eggCount = easterEggsFound.length;
            let progressHint = progressHints.find(h => eggCount >= h.min && eggCount <= h.max);

            const randomHint = hints[Math.floor(Math.random() * hints.length)];
            setHintsUsed(prev => prev + 1);

            return {
                type: 'output',
                text: `💡 Hint #${hintsUsed + 1}:
${progressHint ? progressHint.hint : randomHint}

Random clue: "${randomHint}"

Progress: ${eggCount}/30 Easter eggs found
Type 'achievements' to see what you've discovered!`
            };
        },

        achievements: () => {
            const discovered = easterEggsFound.map(eggName => ({
                name: eggName,
                ...easterEggData[eggName]
            }));

            const allEggs = Object.keys(easterEggData);
            const locked = allEggs.filter(egg => !easterEggsFound.includes(egg));

            const progress = easterEggsFound.length;
            const percentage = Math.round((progress / 30) * 100);
            const barLength = 20;
            const filledLength = Math.round((progress / 30) * barLength);
            const progressBar = '█'.repeat(filledLength) + '░'.repeat(barLength - filledLength);

            let rank = 'Newcomer';
            if (progress >= 26) rank = 'Easter Egg Master 🏆';
            else if (progress >= 16) rank = 'Hacker Apprentice 🔓';
            else if (progress >= 6) rank = 'Security Enthusiast 🛡️';
            else if (progress >= 1) rank = 'Curious Explorer 🔍';

            let discoveredList = discovered.length > 0
                ? discovered.map((egg, i) => `  ${i + 1}. ✓ ${egg.title} - ${egg.description}`).join('\n')
                : '  (None yet - start exploring!)';

            let lockedList = locked.length > 0
                ? locked.slice(0, 10).map((eggName, i) => {
                    const hints = {
                        'sudo_rm': 'Try destructive sudo commands...',
                        'shellshock': 'Test for CVE-2014-6271',
                        'nmap': 'Network scanning tool',
                        'metasploit': 'Pentesting framework',
                        'secret_files': 'Use ls -la to find hidden files',
                        'hack_planet': 'Classic hacker movie quote',
                        'dijkstra': 'Graph algorithm',
                        'konami': 'Classic gaming cheat code'
                    };
                    return `  ${i + 1}. ? ${easterEggData[eggName].title} - ${hints[eggName] || 'Keep exploring...'}`;
                }).join('\n')
                : '  🎉 You found them all!';

            return {
                type: 'output',
                text: `=== EASTER EGG ACHIEVEMENTS ===

Progress: ${progress}/30 (${percentage}%) [${progressBar}]
Rank: ${rank}

🔓 DISCOVERED (${discovered.length}):
${discoveredList}

${locked.length > 0 ? `🔒 LOCKED (${locked.length} remaining):
${lockedList}
${locked.length > 10 ? `\n  ... and ${locked.length - 10} more!` : ''}

💡 Tip: Type 'hint' for clues!` : ''}

${progress === 30 ? '🏆 PERFECT SCORE! You are a true Easter egg hunter!' : ''}`
            };
        },

        ls: (args) => {
            if (args[0] === '-la' || args[0] === '-a') {
                return {
                    type: 'output',
                    text: `total 16
drwxr-xr-x 3 guest guest 4096 Feb 10 23:00 .
drwxr-xr-x 5 root  root  4096 Feb 10 22:00 ..
-rw-r--r-- 1 guest guest  420 Feb 10 22:57 main.cpp
drwxr-xr-x 2 guest guest 4096 Feb 10 22:57 blog/
drwxr-xr-x 2 guest guest 4096 Feb 10 22:57 projects/
-rw-r--r-- 1 guest guest  156 Feb 10 22:57 contact.txt
drwx------ 2 guest guest 4096 Feb 10 22:57 .secret/`
                };
            }
            return {
                type: 'output',
                text: `main.cpp    blog/    projects/    contact.txt`
            };
        },

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

Built with React + Vite | Everblush Theme`,
                '.secret/backdoor.sh': `#!/bin/bash
# Easter Egg: You found the "backdoor"!
# But it's just a joke script 😄

echo "Congratulations! You found the hidden backdoor!"
echo "Unfortunately for you, it's just a rickroll..."
echo "🎵 Never gonna give you up, never gonna let you down 🎵"
echo ""
echo "But seriously, nice work! You have good security instincts."
echo "Want to discuss security or low-level systems?"
echo "Email me: yusufmuhyusuh@gmail.com"`,
                '.secret/flag.txt': `FLAG{y0u_f0und_th3_e4st3r_3gg_c0ngr4ts_h4ck3r}

Nice work! 🎉 You have excellent exploration skills.
Now check out my actual projects: cd projects`
            };

            if (!file) {
                return {
                    type: 'error',
                    text: 'cat: missing operand'
                };
            }

            if (file.includes('.secret/')) {
                discoverEasterEgg('secret_files');
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

        // ROOT/SUDO ACCESS ATTEMPTS
        sudo: (args) => {
            setSudoAttempts(prev => prev + 1);
            logSecurityEvent(`Failed sudo attempt by guest (attempt #${sudoAttempts + 1})`);

            const command = args.join(' ');

            // Special responses for specific commands
            if (command.includes('rm -rf')) {
                discoverEasterEgg('sudo_rm');
                return {
                    type: 'error',
                    text: `Whoa there! That's a bit aggressive. How about we just look at my projects instead?
This incident has been logged to /var/log/failed_attempts.log`
                };
            }

            if (command.includes('reboot')) {
                return {
                    type: 'output',
                    text: `System reboot initiated... Psych! This is a web portfolio, not a real server 🚀`
                };
            }

            if (command === 'make me a sandwich') {
                discoverEasterEgg('xkcd_sandwich');
                return {
                    type: 'output',
                    text: `What? Make it yourself! 🥪
(XKCD reference detected - nice one! 😄)`
                };
            }

            // Progressive responses based on attempts
            if (sudoAttempts >= 3) {
                return {
                    type: 'error',
                    text: `You have been temporarily banned for 5 seconds... Just kidding! But seriously, stop trying 😄
Maybe check out my projects instead? Type: cd projects`
                };
            }

            return {
                type: 'error',
                text: `[sudo] password for guest: ****
Sorry, user guest is not in the sudoers file. This incident will be reported.`
            };
        },

        su: (args) => {
            logSecurityEvent('Privilege escalation attempt: su root');
            return {
                type: 'error',
                text: `Password: ****
su: Authentication failure`
            };
        },

        // EXPLOIT ATTEMPTS
        shellshock: () => {
            discoverEasterEgg('shellshock');
            logSecurityEvent('Exploit attempt: Shellshock (CVE-2014-6271)');
            return {
                type: 'output',
                text: `Attempting CVE-2014-6271 exploit...
bash: warning: This system is patched against Shellshock
Bash version: 5.2.21 (patched)
Nice try though! 🛡️`
            };
        },

        heartbleed: () => {
            discoverEasterEgg('heartbleed');
            logSecurityEvent('Exploit attempt: Heartbleed (CVE-2014-0160)');
            return {
                type: 'output',
                text: `Testing for CVE-2014-0160...
OpenSSL version: 3.0.0 (not vulnerable)
Your security knowledge is impressive! 🔐`
            };
        },

        meltdown: () => {
            discoverEasterEgg('meltdown');
            return {
                type: 'output',
                text: `Checking for Meltdown vulnerability...
CPU: Patched with KPTI (Kernel Page Table Isolation)
Status: Not vulnerable ✅`
            };
        },

        spectre: () => {
            discoverEasterEgg('spectre');
            return {
                type: 'output',
                text: `Checking for Spectre vulnerability...
Mitigations: Retpoline, IBRS, IBPB enabled
Status: Protected 🛡️`
            };
        },

        exploit: () => {
            logSecurityEvent('Generic exploit attempt');
            return {
                type: 'output',
                text: `Searching for vulnerabilities...
[████████████████████] 100%
No exploits found. This system is hardened with:
- SELinux enforcing mode
- Kernel ASLR enabled
- Stack canaries active
- W^X memory protection`
            };
        },

        // HACKER/PENTESTING TOOLS
        nmap: (args) => {
            discoverEasterEgg('nmap');
            return {
                type: 'output',
                text: `Starting Nmap scan on localhost...
PORT     STATE    SERVICE
22/tcp   filtered ssh
80/tcp   open     http
443/tcp  open     https
3000/tcp open     portfolio

Interesting ports on yusuf-portfolio:
Not shown: 996 filtered ports
Note: This is a portfolio, not a vulnerable server 😉`
            };
        },

        metasploit: () => {
            discoverEasterEgg('metasploit');
            return {
                type: 'output',
                text: `      _                  _               _ _
     | |                | |             (_) |
  ___| |_ __ _ _ __ ___| |__   ___  ___ _| |_
 / __| __/ _\` | '__/ __| '_ \\ / _ \\/ __| | __|
 \\__ \\ || (_| | |  \\__ \\ | | |  __/\\__ \\ | |_
 |___/\\__\\__,_|_|  |___/_| |_|\\___||___/_|\\__|

msf6 > use exploit/multi/handler
[-] Error: This is a portfolio website, not a Metasploit instance
[+] But I appreciate your cybersecurity interest!
[*] Check out my projects instead: cd projects`
            };
        },

        hydra: () => {
            discoverEasterEgg('hydra');
            return {
                type: 'output',
                text: `Hydra v9.5 starting...
[ERROR] No valid targets specified
[INFO] This portfolio is not vulnerable to brute force attacks
[TIP] Try 'cat contact.txt' to reach out instead! 💬`
            };
        },

        sqlmap: () => {
            discoverEasterEgg('sqlmap');
            return {
                type: 'output',
                text: `        ___
       __H__
 ___ ___[.]_____ ___ ___  {1.7.2}
|_ -| . [']     | .'| . |
|___|_  ["]_|_|_|__,|  _|
      |_|V...       |_|   https://sqlmap.org

[!] No SQL injection points found
[*] This is a static portfolio - no database to inject!`
            };
        },

        burpsuite: () => {
            discoverEasterEgg('burpsuite');
            return {
                type: 'output',
                text: `Burp Suite Community v2023.x
[*] Proxy listening on 127.0.0.1:8080
[!] This is a client-side portfolio
[*] Nothing to intercept here! 🕵️`
            };
        },

        wireshark: () => {
            discoverEasterEgg('wireshark');
            return {
                type: 'output',
                text: `Capturing on 'lo'...
Packets captured: 0
[INFO] This is a web portfolio, not a network interface
[TIP] But I like your pentesting spirit! 🦈`
            };
        },

        // DESTRUCTIVE COMMANDS
        rm: (args) => {
            const fullCmd = args.join(' ');
            if (fullCmd.includes('-rf') && (fullCmd.includes('/') || fullCmd.includes('*'))) {
                logSecurityEvent(`Destructive command blocked: rm ${fullCmd}`);
                discoverEasterEgg('rm_rf');
                return {
                    type: 'error',
                    text: `rm: cannot remove '/': Permission denied
[ALERT] Destructive command detected!
[INFO] Relax, this is just a portfolio. No actual files were harmed 😅`
                };
            }
            return {
                type: 'error',
                text: `rm: missing operand`
            };
        },

        chmod: (args) => {
            logSecurityEvent('Permission change attempt: chmod');
            return {
                type: 'error',
                text: `chmod: changing permissions of '/': Operation not permitted
[SECURITY] Nice try! But guest users can't modify system permissions.
[TIP] You seem interested in security. Check out my AI & Systems projects!`
            };
        },

        dd: () => {
            logSecurityEvent('Disk wipe attempt: dd');
            discoverEasterEgg('dd_attempt');
            return {
                type: 'error',
                text: `dd: failed to open '/dev/sda': Permission denied
[ALERT] Disk wipe attempt blocked!
[INFO] You're persistent! I like that. Want to collaborate instead?`
            };
        },

        // FUN COMMANDS
        hack: (args) => {
            const fullCmd = args.join(' ');
            if (fullCmd.includes('the planet')) {
                discoverEasterEgg('hack_the_planet');
                return {
                    type: 'output',
                    text: ` _   _            _      _   _            ____  _                 _   
| | | | __ _  ___| | __ | |_| |__   ___  |  _ \\| | __ _ _ __   ___| |_ 
| |_| |/ _\` |/ __| |/ / | __| '_ \\ / _ \\ | |_) | |/ _\` | '_ \\ / _ \\ __|
|  _  | (_| | (__|   <  | |_| | | |  __/ |  __/| | (_| | | | |  __/ |_ 
|_| |_|\\__,_|\\___|_|\\_\\  \\__|_| |_|\\___| |_|   |_|\\__,_|_| |_|\\___|\\__|

[HACKING IN PROGRESS...]
[████████████████████] 100%
Access Denied! But I appreciate the Hackers (1995) reference 😎`
                };
            }
            return {
                type: 'output',
                text: `Hack what? Try: hack the planet`
            };
        },

        matrix: () => {
            discoverEasterEgg('matrix');
            return {
                type: 'output',
                text: `Wake up, Neo...
The Matrix has you...
Follow the white rabbit 🐰

Actually, this is just a portfolio. But if you're into AI and algorithms,
you might enjoy my projects! Type: cd projects`
            };
        },

        cowsay: (args) => {
            discoverEasterEgg('cowsay');
            const message = args.join(' ') || 'Hello';
            return {
                type: 'output',
                text: ` ${'_'.repeat(message.length + 2)}
< ${message} >
 ${'-'.repeat(message.length + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||

Moo! 🐮 Want to see something actually impressive? Try: neofetch`
            };
        },

        sl: () => {
            discoverEasterEgg('sl');
            return {
                type: 'output',
                text: `      ====        ________                ___________
  _D _|  |_______/        \\__I_I_____===__|_________|
   |(_)---  |   H\\________/ |   |        =|___ ___|      
   /     |  |   H  |  |     |   |         ||_| |_||      
  |      |  |   H  |__--------------------| [___] |      
  | ________|___H__/__|_____/[][]~\\_______|       |      
  |/ |   |-----------I_____I [][] []  D   |=======|____  
__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__  
 |/-=|___|=O=====O=====O=====O   |_____/~\\___/          
  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/              

You meant 'ls', didn't you? 🚂`
            };
        },

        fortune: () => {
            const fortunes = [
                "In competitive programming, the best algorithm is the one you can implement correctly.",
                "Low-level optimization is the root of all evil... unless you're writing kernel code.",
                "A good programmer looks both ways before crossing a one-way street.",
                "There are only two hard things in Computer Science: cache invalidation and naming things.",
                "Debugging is twice as hard as writing the code. So if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
            ];
            const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
            return {
                type: 'output',
                text: randomFortune
            };
        },

        // COMPETITIVE PROGRAMMING EASTER EGGS
        dijkstra: () => {
            discoverEasterEgg('dijkstra');
            return {
                type: 'output',
                text: `Calculating shortest path...
From: guest@portfolio
To: root@system
Result: Path not found (Permission denied)
But nice algorithm choice! 📊`
            };
        },

        quicksort: () => {
            discoverEasterEgg('quicksort');
            return {
                type: 'output',
                text: `Sorting privileges...
[guest, user, admin, root]
After sorting: [guest] (You only have one privilege 😅)
Time complexity: O(n log n)
Space complexity: O(1) permissions`
            };
        },

        binarysearch: () => {
            discoverEasterEgg('binarysearch');
            return {
                type: 'output',
                text: `Searching for root access in permission array...
Low: 0, High: 0, Mid: 0
Result: Not found! Array only contains [guest]
But your algorithm knowledge is impressive! 🎯`
            };
        },

        // HIDDEN COMMANDS
        konami: () => {
            discoverEasterEgg('konami');
            return {
                type: 'output',
                text: `↑ ↑ ↓ ↓ ← → ← → B A
🎮 Konami Code Activated! 🎮
+30 Lives... wait, this isn't a game!
But you get bonus points for knowing this! ⭐`
            };
        },

        xyzzy: () => {
            discoverEasterEgg('xyzzy');
            return {
                type: 'output',
                text: `Nothing happens.

(But you know the classics! Colossal Cave Adventure FTW! 🗿)`
            };
        },

        // SECURITY LOG
        'security-log': () => {
            if (securityLog.length === 0) {
                return {
                    type: 'output',
                    text: `=== SECURITY LOG ===
No suspicious activities detected yet.
Try some commands and see what gets logged! 👀`
                };
            }

            const logText = securityLog.map((log, i) =>
                `[${log.timestamp}] ${log.event}`
            ).join('\n');

            const threatLevel = sudoAttempts >= 3 ? 'MEDIUM' : 'LOW';

            return {
                type: 'output',
                text: `=== SECURITY LOG ===
${logText}

Total suspicious activities: ${securityLog.length}
Easter eggs found: ${easterEggsFound.length}
Threat level: ${threatLevel} (You're just having fun 😄)`
            };
        },

        cd: (args) => {
            const target = args[0];

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

        const newHistory = [...history, { type: 'command', text: input }];
        const parts = input.trim().split(' ');
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);

        // Add to command history
        setCommandHistory(prev => [...prev, input]);
        setHistoryIndex(-1);

        // Special handling for fork bomb
        if (input.includes(':(){ :|:& };:')) {
            logSecurityEvent('Fork bomb attempt');
            discoverEasterEgg('fork_bomb');
            newHistory.push({
                type: 'error',
                text: `Fork bomb detected! 💣
[SYSTEM] Implementing process limits...
[SYSTEM] Resource exhaustion prevented
[INFO] Classic attack! But this terminal has safeguards 🛡️`
            });
            setHistory(newHistory);
            setInput('');
            return;
        }

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

    // Handle keyboard events for command history
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput('');
            }
        }
    };

    useEffect(() => {
        historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    // Calculate session uptime
    const getSessionUptime = () => {
        const uptime = Math.floor((Date.now() - sessionStartTime) / 1000);
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = uptime % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const getCurrentPath = () => {
        const path = location.pathname;
        if (path === '/') return '~';
        return `~${path}`;
    };

    return (
        <>
            {/* Hidden State Indicator - Shows when terminal is minimized */}
            {isMinimized && (
                <div
                    className="fixed bottom-0 left-0 right-0 bg-everblush-bg-light border-t border-everblush-green/30 px-4 py-2 flex items-center justify-between cursor-pointer hover:bg-everblush-bg-light/80 transition-colors z-40"
                    onClick={() => setIsMinimized(false)}
                >
                    <div className="flex items-center gap-3 text-everblush-fg/60 text-sm">
                        <span>📟 Terminal</span>
                        <span className="text-everblush-fg/40">•</span>
                        <span className="text-everblush-green">🎁 {easterEggsFound.length} Easter eggs found</span>
                        {securityLog.length > 0 && (
                            <>
                                <span className="text-everblush-fg/40">•</span>
                                <span className="text-everblush-yellow">⚠ {securityLog.length} events</span>
                            </>
                        )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-everblush-fg/40">
                        <span>Ctrl+` to open</span>
                        <span>▲</span>
                    </div>
                </div>
            )}

            {/* Terminal Window */}
            <div className={`bg-everblush-bg border-t border-everblush-green/30 font-mono text-sm transition-all duration-300 ${isFocused ? 'shadow-lg shadow-everblush-green/20' : ''
                } rounded-t-lg overflow-hidden ${isMinimized ? 'hidden' : ''}`}>
                {/* Terminal Title Bar */}
                <div className="bg-everblush-bg-light border-b border-everblush-green/20 px-4 py-2 flex items-center justify-between select-none">
                    <div className="flex items-center gap-3">
                        {/* Window Controls */}
                        <div className="flex items-center gap-2">
                            <button
                                className="w-3 h-3 rounded-full bg-everblush-red hover:bg-everblush-red/80 transition-colors"
                                onClick={() => setIsMinimized(!isMinimized)}
                                title="Minimize (Ctrl+`)"
                            />
                            <button
                                className="w-3 h-3 rounded-full bg-everblush-yellow hover:bg-everblush-yellow/80 transition-colors"
                                title="Maximize"
                            />
                            <button
                                className="w-3 h-3 rounded-full bg-everblush-green hover:bg-everblush-green/80 transition-colors"
                                title="Close"
                            />
                        </div>

                        {/* Title */}
                        <span className="text-everblush-fg/60 text-xs">
                            guest@yusuf-portfolio: {getCurrentPath()}
                        </span>
                    </div>

                    {/* Easter Eggs Counter */}
                    <div className="text-everblush-fg/40 text-xs flex items-center gap-2">
                        <span>🎁 {easterEggsFound.length}/30</span>
                    </div>
                </div>

                {/* Tab Bar */}
                <div className="bg-everblush-bg-light border-b border-everblush-green/20 px-4 py-1 flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1 bg-everblush-bg rounded-t text-xs text-everblush-green">
                        <span className="w-2 h-2 rounded-full bg-everblush-green animate-pulse" />
                        <span>bash</span>
                    </div>
                    <button className="text-everblush-fg/40 hover:text-everblush-fg/60 text-xs px-2">+</button>
                </div>

                {/* Terminal Content */}
                {!isMinimized && (
                    <>
                        <div className="p-4 max-h-64 overflow-y-auto">
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
                                            <div className="text-everblush-red pl-4 whitespace-pre-line">
                                                {entry.text}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div ref={historyEndRef} />
                            </div>

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
                                    onKeyDown={handleKeyDown}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    className="flex-1 ml-2 bg-transparent outline-none text-everblush-fg caret-everblush-green"
                                    autoComplete="off"
                                    spellCheck="false"
                                />
                            </form>
                        </div>

                        {/* Status Bar */}
                        <div className="bg-everblush-bg-light border-t border-everblush-green/20 px-4 py-1 flex items-center justify-between text-xs text-everblush-fg/50">
                            <div className="flex items-center gap-4">
                                <span className="text-everblush-green">{isFocused ? 'INSERT' : 'NORMAL'}</span>
                                <span>{getCurrentPath()}</span>
                                <span>{commandHistory.length} commands</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span>Session: {getSessionUptime()}</span>
                                {securityLog.length > 0 && (
                                    <span className="text-everblush-yellow">⚠ {securityLog.length} events</span>
                                )}
                            </div>
                        </div>
                    </>
                )}

                {/* Achievement Toasts */}
                {achievements.map((achievement, index) => (
                    <AchievementToast
                        key={index}
                        achievement={achievement}
                        onDismiss={() => dismissAchievement(index)}
                    />
                ))}
            </div>
        </>
    );
};

export default Terminal;
