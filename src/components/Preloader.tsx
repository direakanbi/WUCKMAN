import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const words = ["LOADING", "ASSETS", "TEXTURES", "STYLE", "WUCKMAN"];

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
    const [count, setCount] = useState(0);
    const [currentWord, setCurrentWord] = useState(0);
    const [showCounter, setShowCounter] = useState(true);

    useEffect(() => {
        // Step 1: Simulated progress up to 99%
        const simulatedDuration = 2000;
        const interval = 20;
        const steps = simulatedDuration / interval;
        const increment = 99 / steps;

        const timer = setInterval(() => {
            setCount((prev) => {
                const newValue = prev + increment;
                // Cap at 99% until fully loaded
                if (newValue >= 99) {
                    return 99;
                }
                return newValue;
            });
        }, interval);

        const wordTimer = setInterval(() => {
            setCurrentWord(prev => (prev + 1) % words.length);
        }, 300);

        // Step 2: Handle Window Load
        const handleLoad = () => {
            clearInterval(timer); // Stop simulation
            setCount(100); // Jump to 100%

            // Start exit sequence
            setTimeout(() => setShowCounter(false), 200);
            setTimeout(() => {
                onComplete();
            }, 1000); // Delay after 100% before opening
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => {
            clearInterval(timer);
            clearInterval(wordTimer);
            window.removeEventListener('load', handleLoad);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-brand-black flex flex-col items-center justify-center text-white"
            initial={{ y: 0 }}
            exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
            <div className="flex flex-col items-center gap-8 w-full h-full justify-center">
                {/* Logo Animation */}
                <motion.div
                    layout // Animate layout changes (centering when siblings disappear)
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: !showCounter ? 1.2 : 1, // Slight scale up when solo
                    }}
                    transition={{
                        opacity: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
                        layout: { duration: 0.8, ease: "easeInOut" }
                    }}
                    className="relative z-10"
                >
                    {/* UPDATED: Removed 'invert' class to show original logo color */}
                    <img src={logo} alt="WUCKMAN" className="h-16 md:h-24 object-contain" />
                </motion.div>

                <AnimatePresence>
                    {showCounter && (
                        <motion.div
                            initial={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0, transition: { duration: 0.5 } }}
                            className="flex flex-col items-center overflow-hidden"
                        >
                            <motion.h1
                                className="text-6xl md:text-8xl font-heading tracking-tighter"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                {Math.round(count)}%
                            </motion.h1>
                            <div className="h-1 w-48 bg-white/10 overflow-hidden relative mt-4">
                                <motion.div
                                    className="h-full bg-brand-red"
                                    style={{ width: `${count}%` }}
                                />
                            </div>
                            <p className="mt-4 font-body text-xs uppercase tracking-[0.5em] text-white/50">
                                {words[currentWord]}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Preloader;
