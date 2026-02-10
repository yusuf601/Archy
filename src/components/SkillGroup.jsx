import React from 'react';
import { motion } from 'framer-motion';

const SkillGroup = ({ title, skills = [], icon }) => {
    return (
        <div className="mb-8">
            {/* Group Title */}
            <h3 className="font-mono text-lg font-bold text-everblush-green mb-4 flex items-center gap-2">
                {icon && <span>{icon}</span>}
                <span className="syntax-comment">// {title}</span>
            </h3>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {skills.map((skill, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="px-4 py-3 bg-everblush-bg/50 border border-everblush-green/20 rounded 
                     hover:border-everblush-green/50 hover:shadow-glow-green transition-all duration-300
                     cursor-default"
                    >
                        <span className="font-mono text-sm text-everblush-fg/80 hover:text-everblush-green transition-colors">
                            {skill}
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default SkillGroup;
