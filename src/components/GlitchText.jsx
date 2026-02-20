import React, { useState, useEffect } from 'react';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';

const GlitchText = ({ text, className = "", hoverProp = true }) => {
    const [displayText, setDisplayText] = useState(text);

    const scramble = () => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split('')
                    .map((char, index) => {
                        if (index < iterations) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('')
            );

            if (iterations >= text.length) {
                clearInterval(interval);
            }

            iterations += 1 / 3;
        }, 30);
    };

    return (
        <span
            className={`font-mono inline-block ${className}`}
            onMouseEnter={hoverProp ? scramble : undefined}
            onClick={!hoverProp ? scramble : undefined}
        >
            {displayText}
        </span>
    );
};

export default GlitchText;
