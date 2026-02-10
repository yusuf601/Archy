# Archy - Terminal-Themed Portfolio

> A creative coding portfolio with a heavy Terminal/IDE aesthetic, built with React + Vite + Tailwind CSS

## 🎨 Design Philosophy

This portfolio embraces a **"Standard Web Layout skinned with a C++ coding environment"** aesthetic, featuring:

- **Everblush Theme**: Minimalist dark color scheme
- **JetBrains Mono**: Monospace typography throughout
- **Terminal Aesthetic**: Command-line inspired UI elements
- **Syntax Highlighting**: C++ code-style presentation

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Visit **http://localhost:5173/** to view the portfolio.

## 🎯 Features

### Terminal Prompt Navbar
- Logo styled as `yusuf@uho:~$`
- Navigation links as executable files (`./home`, `./projects`, etc.)
- Inverted block cursor hover effect

### C++ Styled Hero Section
- Syntax-highlighted headline: `std::cout << "Hi, I'm Muh Yusuf";`
- Blinking cursor animation
- Comment-style bio information
- Terminal command buttons

### Interactive Terminal
The portfolio includes a **fully functional terminal** at the bottom of the page. Try these commands:
- `help` - See all available commands
- `ls`, `pwd`, `cd` - Navigate the portfolio
- `cat main.cpp` - View source files
- `neofetch` - Display system information

### Everblush Color Scheme
- Background: `#141b1e`
- Foreground: `#dadada`
- Accents: Green `#8ccf7e`, Blue `#6c8ed4`, Red `#e57474`

## 🎁 Easter Eggs & Hidden Features

**For the curious visitors:** This portfolio contains **30+ hidden Easter eggs** and security-themed interactions! 

### 🔍 Hints for Exploration:
- Try common Linux commands you'd use on a real system
- What happens if you try to get root access? 🔐
- Security researchers: Try testing for known vulnerabilities (CVE references)
- Pentesters: Your favorite tools might be here... `nmap`, `metasploit`, anyone?
- Found a `.secret` directory? Explore what's inside! 🕵️
- Classic hacker movie references are hidden throughout
- Competitive programmers: Algorithm commands might surprise you
- Try being destructive (don't worry, nothing will break! 😄)
- XKCD fans will find something familiar
- Retro gamers: Classic references await

### 🎯 Challenge:
Can you find the hidden CTF flag? Start with `ls -la` and see where it takes you...

**Hint:** Type `security-log` to track your discoveries!

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx           # Terminal prompt navigation
│   ├── Hero.jsx             # C++ styled hero section
│   ├── Terminal.jsx         # Interactive terminal with Easter eggs
│   ├── ScrollProgress.jsx   # Buffer loading bar
│   ├── NowPlaying.jsx       # Terminal music player widget
│   ├── TechMarquee.jsx      # Scrolling compilation flags
│   └── SocialLinks.jsx      # Symbolic link style social links
├── App.jsx                  # Main application
├── main.jsx                 # React entry point
└── index.css                # Global styles & animations
```

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Vite 7** - Build tool
- **Tailwind CSS 3** - Utility-first CSS
- **Framer Motion** - Animations
- **React Router** - Navigation
- **JetBrains Mono** - Monospace font

## 👨‍💻 About

**Muh Yusuf**  
Informatics Engineering Student @ Universitas Halu Oleo (4th Semester)

**Focus Areas:**
- Competitive Programming (C++20, STL, Algorithms)
- Low-level Systems Programming
- AI Research (Fuzzy Logic, Machine Learning)
- Linux Enthusiast (CachyOS + Neovim)

**Contact:**
- Email: yusufmuhyusuh@gmail.com
- GitHub: [@yusuf601](https://github.com/yusuf601)
- LinkedIn: [muh-yusuf-7154b7204](https://www.linkedin.com/in/muh-yusuf-7154b7204)

## 🎮 Interactive Features

- **Custom Crosshair Cursor** - Terminal-style cursor throughout
- **Scroll Progress Bar** - Buffer loading indicator at top
- **Terminal Music Player** - ncmpcpp/cmus style widget with visualizer
- **Tech Marquee** - Scrolling C++/CMake compilation flags
- **Social Links** - Unix symbolic link style (`ln -s`)
- **System Flags** - Personality badges (UPTIME, LOCATION, STATUS)
- **Security Log** - Tracks all your terminal "exploits"

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

---

**Pro Tip:** The terminal is more than just decoration. Explore it thoroughly - you might discover something interesting! 😉