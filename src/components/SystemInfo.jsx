import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import SocialLinks from './SocialLinks';
import GlitchText from './GlitchText';

const EVERBLUSH_PALETTE = [
    '#2d3135', '#232a2d', '#404a4d',
    '#e57474', '#8ccf7e', '#e5c76b',
    '#67b0e8', '#c47fd5', '#6cbfbf',
    '#b3b9b8',
];

const SystemInfo = () => {
    const sysDetails = [
        { key: 'User', value: 'muhyusuf' },
        { key: 'Host', value: 'universitas_halu_oleo' },
        { key: 'OS', value: 'CachyOS (Arch-based)' },
        { key: 'Kernel', value: 'Linux 6.x (Zen)' },
        { key: 'IDE', value: 'Neovim (NvChad)' },
        { key: 'Focus', value: 'AI & Low-level Systems' },
        { key: 'Semester', value: '4' },
    ];

    const timeline = [
        { year: '2024–now', role: 'Research_Assistant', org: 'UHO' },
        { year: '2023–now', role: 'Freelance_Dev', org: 'Remote' },
        { year: '2023', role: 'Informatics_Entered', org: 'UHO' },
    ];

    const exploring = [
        'Fuzzy Clustering Algorithms',
        'Systems Programming with C++20',
        'Linux Kernel Development',
    ];

    return (
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="border border-everblush-green/30 rounded-lg p-8 sm:p-12 bg-everblush-bg/50 backdrop-blur-sm">

                    {/* Header */}
                    <ScrollReveal>
                        <div className="mb-10">
                            <h2 className="text-3xl sm:text-4xl font-mono font-bold text-syntax-header mb-2">
                                <GlitchText text="// System Information" />
                            </h2>
                            <p className="font-mono text-sm text-syntax-meta">
                                <span className="syntax-keyword">neofetch</span> --config portfolio.conf
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">

                        {/* Left: ASCII Art + palette bar */}
                        <ScrollReveal delay={0.2}>
                            <div className="space-y-4">
                                <pre className="text-everblush-blue text-[10px] sm:text-xs leading-tight font-mono select-none">
                                    {`                   -\`
                  .o+\`
                 \`ooo/
                \`+oooo:
               \`+oooooo:
               -+oooooo+:
             \`\`/:-:++oooo+:
            \`\`/++++/+++++++:
           \`\`/++++++++++++++:
          \`\`/+++ooooooooooooo/\`
         ./ooosssso++osssssso+\`
        .oossssso-\`   \`/ossssss\`
       -osssssso.      :ssssssso.
      :osssssss/        osssso+++.
     /ossssssss/        +ssssooo/-
   \`/ossssso+/:-        -:/+osssso+-
  \`+sso+:-\`                 \`.-/+oso:
 \`++:.                           \`-/+/
 .\`                                 \`/`}
                                </pre>

                                {/* Everblush color palette bar */}
                                <div className="flex gap-1.5">
                                    {EVERBLUSH_PALETTE.map((color, i) => (
                                        <motion.div
                                            key={i}
                                            title={color}
                                            className="h-5 flex-1 rounded-sm cursor-default"
                                            style={{ backgroundColor: color }}
                                            whileHover={{ scaleY: 1.4, y: -2 }}
                                            transition={{ type: 'spring', stiffness: 400 }}
                                        />
                                    ))}
                                </div>
                                <p className="font-mono text-[10px] text-everblush-fg/30">// Everblush color palette</p>
                            </div>
                        </ScrollReveal>

                        {/* Right: Details + timeline + exploring */}
                        <ScrollReveal delay={0.3}>
                            <div className="space-y-8 font-mono text-sm">

                                {/* Bio */}
                                <div>
                                    <h3 className="text-everblush-green font-bold text-base mb-1">
                                        muhyusuf@uho
                                    </h3>
                                    <div className="h-px bg-everblush-green/30 mb-4" />
                                    <div className="space-y-2">
                                        {sysDetails.map(({ key, value }, i) => (
                                            <motion.div
                                                key={i}
                                                className="flex gap-2"
                                                initial={{ opacity: 0, x: 10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.06 }}
                                            >
                                                <span className="text-everblush-green font-semibold w-24 shrink-0">{key}:</span>
                                                <span className="text-everblush-fg/80">{value}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Mini experience timeline */}
                                <div>
                                    <p className="text-everblush-fg/40 text-xs mb-3">
                                        <span className="syntax-keyword">git</span> log --oneline --author=muhyusuf
                                    </p>
                                    <div className="space-y-3 border-l-2 border-everblush-green/30 pl-4">
                                        {timeline.map((item, i) => (
                                            <div key={i} className="relative">
                                                <span className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-everblush-green/60 border border-everblush-green" />
                                                <span className="text-everblush-fg/40 text-xs">{item.year}</span>
                                                <p className="text-everblush-green text-xs font-semibold">{item.role}</p>
                                                <p className="text-everblush-fg/50 text-xs">{item.org}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Currently Exploring */}
                                <div>
                                    <p className="text-everblush-fg/40 text-xs mb-3">
                                        <span className="syntax-comment">// Currently exploring:</span>
                                    </p>
                                    <div className="space-y-2">
                                        {exploring.map((item, i) => (
                                            <motion.div
                                                key={i}
                                                className="flex items-center gap-2 text-everblush-fg/70"
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.1 }}
                                            >
                                                <span className="text-everblush-green">→</span>
                                                <span>{item}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </ScrollReveal>
                    </div>
                </div>

                {/* Social links */}
                <ScrollReveal delay={0.5}>
                    <SocialLinks />
                </ScrollReveal>
            </div>
        </section>
    );
};

export default SystemInfo;
