import React from 'react';
import { motion } from 'framer-motion';
import MotionText, { compilerContainer, metadataItem } from './MotionText';

const splitTitle = (title) => {
    if (title.includes(',')) {
        const [first, ...rest] = title.split(',');
        return [`${first},`, rest.join(',').trim()].filter(Boolean);
    }

    return [title];
};

const SectionDivider = ({ title, kicker }) => (
    <div className="px-6 py-20 md:py-28">
        <motion.div
            variants={compilerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            custom={{ delay: 0, stagger: 0.08 }}
            className="mx-auto max-w-6xl border-t border-[var(--border-light)] pt-8 md:pt-10"
        >
            {kicker && (
                <motion.p
                    variants={metadataItem}
                    className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--accent-info)]"
                >
                    {kicker}
                </motion.p>
            )}
            <MotionText
                as="h2"
                segments={splitTitle(title)}
                delay={0.04}
                stagger={0.08}
                amount={0.35}
                className="font-display max-w-4xl text-3xl font-black leading-tight tracking-tight text-[var(--text-primary)] md:text-5xl"
                itemClassName="block"
            />
        </motion.div>
    </div>
);

export default SectionDivider;
