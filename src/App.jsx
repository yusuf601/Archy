import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Terminal from './components/Terminal';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

function AppContent() {
    const [editorMode, setEditorMode] = useState('NORMAL');
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    const handleModeChange = (mode) => {
        setEditorMode(mode);
    };

    const handleLoadingComplete = () => {
        setIsLoading(false);
    };

    // Get current filename based on route
    const getCurrentFileName = () => {
        const path = location.pathname;
        const fileMap = {
            '/': 'main.cpp',
            '/blog': 'blog.md',
            '/projects': 'projects.cpp',
            '/contact': 'contact.cpp'
        };
        return fileMap[path] || 'main.cpp';
    };

    return (
        <>
            {/* Loading Screen */}
            {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}

            {/* Scroll Progress Bar */}
            {!isLoading && <ScrollProgress />}

            {/* Main App */}
            <div className="flex h-screen bg-everblush-bg overflow-hidden">
                {/* CRT Scanline Overlay */}
                <div className="crt-overlay"></div>

                {/* Sidebar */}
                <Sidebar />

                {/* Main Editor Area */}
                <main className="flex-1 flex flex-col overflow-hidden">
                    {/* Content Area with Route Transitions */}
                    <div className="flex-1 overflow-y-auto section-transition">
                        <AnimatePresence mode="wait">
                            <Routes location={location} key={location.pathname}>
                                <Route path="/" element={<Home />} />
                                <Route path="/blog" element={<Blog />} />
                                <Route path="/projects" element={<Projects />} />
                                <Route path="/contact" element={<Contact />} />
                            </Routes>
                        </AnimatePresence>
                    </div>

                    {/* Terminal */}
                    <Terminal onModeChange={handleModeChange} />

                    {/* Footer Status Bar */}
                    <Footer mode={editorMode} currentFile={getCurrentFileName()} />
                </main>
            </div>
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

export default App;
