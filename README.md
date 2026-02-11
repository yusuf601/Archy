# Archy - Terminal-Themed Portfolio

> A creative coding portfolio with a heavy Terminal/IDE aesthetic, built with React + Vite + Tailwind CSS.
>
> **Live Demo:** [https://kingyusuf.netlify.app](https://kingyusuf.netlify.app)

## 🎨 Design Philosophy

Archy embraces a **"Portfolio as an IDE"** aesthetic, blending standard web layouts with a C++ coding environment. It invites visitors to explore rather than just scroll.

- **Theme:** Everblush (Dark, Minimalist)
- **Typography:** JetBrains Mono (Nerd Font patched)
- **Interaction:** Command-line inspired + GUI hybrid
- **Vibe:** "Hacker/Developer" workspace

## 🌟 Key Features

### 1. 🖥️ Interactive Terminal
A fully functional terminal emulator at the bottom of the page.
- **Commands:** `ls`, `cd`, `cat`, `whoami`, `neofetch`, `security`, `hint`
- **Gimmicks:** Real `wget` animation for CV download
- **Easter Eggs:** 30+ hidden secrets, Matrix rain, sudo commands
- **Shortcuts:** `Ctrl+` ` to toggle, `Ctrl+L` to clear, `Up/Down` for history

### 2. 📂 VS Code-Style Sidebar
A sophisticated navigation pane acting as your file explorer.
- **EXPLORER:** Navigate pages like files (`main.cpp`, `projects.cpp`)
- **OUTLINE:** Career history (Education & Experience)
- **MODULES:** Tech stack categorized as system modules
- **ACTIONS:** Quick command buttons (`make install_cv`, `./send_email`)
- **Responsive:** Slides away on mobile with a hamburger toggle

### 3. 💾 C++ & System Aesthetic
- **Hero Section:** `std::cout` syntax highlighting with blinking cursor
- **Projects:** Displayed as `struct Project` with compilation flags
- **Contact:** `struct Contact` with `wget` download options
- **Status Bar:** Vim-style mode indicators (NORMAL, INSERT)

### 4. 🚀 Interactive Elements
- **Tech Marquee:** Scrolling C++/CMake flags
- **Music Player:** ncmpcpp-style media widget
- **Buffer Bar:** Scroll progress indicator
- **Theme Consistency:** All UI elements match the Everblush palette

## 🛠️ Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS 3
- **Animations:** Framer Motion
- **Icons:** React Icons (Feather/FontAwesome)
- **Routing:** React Router DOM

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yusuf601/Archy.git

# Enter directory
cd Archy

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit **http://localhost:5173/** to view the portfolio.

## 📖 Usage Guide

### Navigation
- Click files in the **Sidebar** to navigate.
- Click **"sh view_work.sh"** or **"cat contact.cpp"** in the Hero section.
- Use terminal commands: `cd projects`, `cat contact.cpp`.

### Unique Commands
| Command | Description |
| :--- | :--- |
| `neofetch` | Display system/profile stats |
| `wget [url]` | Interactive CV download animation |
| `matrix` | Enter the Matrix |
| `sudo` | Try to get root access (Good luck!) |
| `hint` | Get a clue for a hidden secret |

### Downloading Resume
- **GUI:** Click the "Download PDF" button on the Contact page.
- **Terminal (Real):** Run `wget https://kingyusuf.netlify.app/MuhYusuf_Resume.pdf`
- **Terminal (Gimmick):** Type the same `wget` command in the portfolio terminal!

## ⚙️ Customization

1. **Personal Info:** Edit `src/components/Hero.jsx` and `src/components/Sidebar.jsx`.
2. **Projects:** update `src/data/projects.js`.
3. **Resume:** Replace `public/MuhYusuf_Resume.pdf`.
4. **Links:** Update social links in `src/components/SocialLinks.jsx`.

## � Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx        # VS Code style explorer
│   ├── Terminal.jsx       # Interactive terminal engine
│   ├── Hero.jsx           # Landing page component
│   ├── ProjectCard.jsx    # C++ struct style card
│   └── ...
├── data/
│   └── projects.js        # Project data source
├── pages/
│   ├── Home.jsx           # Main entry
│   ├── Projects.jsx       # Project gallery
│   └── Contact.jsx        # Contact & CV download
└── App.jsx                # Routing & Layout
```

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Pro Tip:** Try typing `help` in the terminal to get started. Happy hacking! �️‍♂️