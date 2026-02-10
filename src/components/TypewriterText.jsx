import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({
    text,
    speed = 50,
    className = '',
    onComplete = () => { },
    startDelay = 0
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (startDelay > 0) {
            const delayTimer = setTimeout(() => {
                setCurrentIndex(0);
            }, startDelay);
            return () => clearTimeout(delayTimer);
        }
    }, [startDelay]);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, speed);

            return () => clearTimeout(timer);
        } else if (currentIndex === text.length && !isComplete) {
            setIsComplete(true);
            onComplete();
        }
    }, [currentIndex, text, speed, isComplete, onComplete]);

    return (
        <span className={className}>
            {displayedText}
            {!isComplete && <span className="cursor"></span>}
            {isComplete && <span className="cursor"></span>}
        </span>
    );
};

export default TypewriterText;
