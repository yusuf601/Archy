import React from 'react';
import ScrollReveal from './ScrollReveal';
import SocialLinks from './SocialLinks';

const SystemInfo = () => {
    return (
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="border border-everblush-green/30 rounded-lg p-8 sm:p-12 bg-everblush-bg/50 backdrop-blur-sm">

                    {/* Header */}
                    <ScrollReveal>
                        <div className="mb-12">
                            <h2 className="text-4xl sm:text-5xl font-mono font-bold text-syntax-header mb-4">
                                <span className="syntax-comment">// System Information</span>
                            </h2>
                            <p className="font-mono text-lg text-syntax-meta leading-relaxed">
                                <span className="syntax-keyword">neofetch</span> --config portfolio.conf
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Left: ASCII Art */}
                        <ScrollReveal delay={0.2}>
                            <div className="flex items-center justify-center md:justify-start">
                                <pre className="text-everblush-blue text-xs sm:text-sm leading-tight font-mono">
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
        .oossssso-\`\`\`\`/ossssss\`
       -osssssso.      :ssssssso.
      :osssssss/        osssso+++.
     /ossssssss/        +ssssooo/-
   \`/ossssso+/:-        -:/+osssso+-
  \`+sso+:-\`                 \`.-/+oso:
 \`++:.                           \`-/+/
 .\`                                 \`/`}
                                </pre>
                            </div>
                        </ScrollReveal>

                        {/* Right: System Details */}
                        <ScrollReveal delay={0.3}>
                            <div className="space-y-4 font-mono text-base sm:text-lg">
                                {/* Bio Section */}
                                <div className="mb-8">
                                    <h3 className="text-everblush-green font-bold text-xl mb-4">
                                        muhyusuf@uho
                                    </h3>
                                    <p className="text-syntax-content leading-relaxed">
                                        Informatics Engineering student passionate about low-level systems,
                                        AI research, and building efficient software solutions.
                                    </p>
                                </div>

                                {/* System Info */}
                                <div className="space-y-3">
                                    <div className="flex">
                                        <span className="text-everblush-green font-semibold w-32">User:</span>
                                        <span className="text-syntax-content">muhyusuf</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-everblush-green font-semibold w-32">Host:</span>
                                        <span className="text-syntax-content">universitas_halu_oleo</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-everblush-green font-semibold w-32">OS:</span>
                                        <span className="text-syntax-content">CachyOS (Arch-based)</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-everblush-green font-semibold w-32">Kernel:</span>
                                        <span className="text-syntax-content">Linux 6.x (Zen)</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-everblush-green font-semibold w-32">IDE:</span>
                                        <span className="text-syntax-content">Neovim (NvChad)</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-everblush-green font-semibold w-32">Focus:</span>
                                        <span className="text-syntax-content">AI & Low-level Systems</span>
                                    </div>
                                    <div className="flex">
                                        <span className="text-everblush-green font-semibold w-32">Semester:</span>
                                        <span className="text-syntax-content">4</span>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>

                {/* Social Links Section */}
                <ScrollReveal delay={0.5}>
                    <SocialLinks />
                </ScrollReveal>
            </div>
        </section>
    );
};

export default SystemInfo;
