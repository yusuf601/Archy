import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import SystemInfo from '../components/SystemInfo';
import TechStack from '../components/TechStack';
import TechMarquee from '../components/TechMarquee';
import RecentActivity from '../components/RecentActivity';

const Home = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-0"
        >
            {/* Hero Section */}
            <Hero />

            {/* Tech Stack Marquee */}
            <TechMarquee />

            {/* System Info Section */}
            <SystemInfo />

            {/* Tech Stack Section */}
            <TechStack />

            {/* Recent Activity Section */}
            <RecentActivity />
        </motion.div>
    );
};

export default Home;
