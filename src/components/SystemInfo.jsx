import React from 'react';

const SystemInfo = () => {
    const systemData = [
        { key: 'User', value: 'muhyusuf' },
        { key: 'Host', value: 'universitas_halu_oleo' },
        { key: 'OS', value: 'CachyOS (Arch-based)' },
        { key: 'Kernel', value: 'Linux 6.x (Zen)' },
        { key: 'IDE', value: 'Neovim (NvChad)' },
        { key: 'Focus', value: 'AI & Low-level Systems' },
    ];

    return (
        <section id="about" className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="border border-everblush-green/30 rounded-lg p-6 sm:p-8 md:p-12 bg-everblush-bg/50 backdrop-blur-sm">

                    {/* Neofetch-style layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

                        {/* Left: ASCII Art Logo */}
                        <div className="flex items-center justify-center md:justify-start">
                            <pre className="text-everblush-blue text-xs sm:text-sm leading-tight font-mono">
                                {`                   -\`
                  .o+\`
                 \`ooo/
                \`+oooo:
               \`+oooooo:
               -+oooooo+:
             \`/:-:++oooo+:
            \`/++++/+++++++:
           \`/++++++++++++++:
          \`/+++ooooooooooooo/\`
         ./ooosssso++osssssso+\`
        .oossssso-\`\`\`\`/ossssss+\`
       -osssssso.      :ssssssso.
      :osssssss/        osssso+++.
     /ossssssss/        +ssssooo/-
   \`/ossssso+/:-        -:/+osssso+-
  \`+sso+:-\`                 \`.-/+oso:
 \`++:.                           \`-/+/
 .\`                                 \`/`}
                            </pre>
                        </div>

                        {/* Right: System Info */}
                        <div className="flex flex-col justify-center space-y-3">
                            {systemData.map((item, index) => (
                                <div key={index} className="flex font-mono text-sm sm:text-base">
                                    <span className="text-everblush-green font-semibold min-w-[100px] sm:min-w-[120px]">
                                        {item.key}:
                                    </span>
                                    <span className="text-everblush-fg ml-2">
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SystemInfo;
