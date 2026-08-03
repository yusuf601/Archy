import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const compilerContainer = {
    hidden: {},
    visible: (config = {}) => ({
        transition: {
            delayChildren: config.delay ?? 0,
            staggerChildren: config.stagger ?? 0.08,
        },
    }),
};

export const compilerItem = {
    hidden: {
        opacity: 0,
        y: 18,
        filter: 'blur(4px)',
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

export const metadataItem = {
    hidden: {
        opacity: 0,
        y: 6,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.38,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const motionTags = {
    h1: motion.h1,
    h2: motion.h2,
    h3: motion.h3,
    h4: motion.h4,
    p: motion.p,
    div: motion.div,
    span: motion.span,
};

const MotionText = ({
    as = 'span',
    segments,
    className = '',
    itemClassName = 'block',
    delay = 0,
    stagger = 0.08,
    amount = 0.3,
}) => {
    const shouldReduceMotion = useReducedMotion();
    const Tag = motionTags[as] ?? motion.span;

    if (shouldReduceMotion) {
        return (
            <Tag className={className}>
                {segments.map((segment, index) => (
                    <span key={`${segment}-${index}`} className={itemClassName}>
                        {segment}
                    </span>
                ))}
            </Tag>
        );
    }

    return (
        <Tag
            variants={compilerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount }}
            custom={{ delay, stagger }}
            className={className}
        >
            {segments.map((segment, index) => (
                <motion.span
                    key={`${segment}-${index}`}
                    variants={compilerItem}
                    className={itemClassName}
                >
                    {segment}
                </motion.span>
            ))}
        </Tag>
    );
};

export default MotionText;
