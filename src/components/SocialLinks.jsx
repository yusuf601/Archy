import React from 'react';
import { motion } from 'framer-motion';

const SocialLinks = () => {
    const links = [
        {
            name: 'github',
            url: 'https://github.com/yusuf601',
            command: 'ln -s /github/yusuf601 ./socials/github'
        },
        {
            name: 'linkedin',
            url: 'https://www.linkedin.com/in/muh-yusuf-7154b7204',
            command: 'ln -s /linkedin/muh-yusuf-7154b7204 ./socials/linkedin'
        },
        {
            name: 'email',
            url: 'mailto:yusufmuhyusuh@gmail.com',
            command: 'ln -s /mail/yusufmuhyusuh@gmail.com ./socials/email'
        }
    ];

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl sm:text-3xl font-mono font-bold text-syntax-header mb-6">
                    <span className="syntax-comment">// External Links</span>
                </h3>

                <div className="space-y-3">
                    {links.map((link, index) => (
                        <motion.a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="block font-mono text-sm sm:text-base p-4 border border-everblush-green/30 
                       rounded bg-everblush-bg/50 symlink glitch-hover"
                        >
                            <span className="text-everblush-green">$</span>{' '}
                            <span className="text-everblush-fg/80">{link.command}</span>
                        </motion.a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SocialLinks;
