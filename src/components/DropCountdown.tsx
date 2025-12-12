import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DropCountdown = () => {
    // Set drop date to 3 days from now for demo purposes
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        // Set target date (e.g., next Friday at midnight)
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 3);
        targetDate.setHours(0, 0, 0, 0);

        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (time: number) => time.toString().padStart(2, '0');

    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="fixed bottom-0 left-0 w-full bg-brand-red text-white py-2 z-40 overflow-hidden border-t border-brand-white/10"
        >
            <div className="flex animate-marquee whitespace-nowrap">
                {[...Array(10)].map((_, i) => (
                    <span key={i} className="mx-8 font-heading uppercase tracking-widest text-sm md:text-base">
                        Next Drop In: {formatTime(timeLeft.days)}d {formatTime(timeLeft.hours)}h {formatTime(timeLeft.minutes)}m {formatTime(timeLeft.seconds)}s  ///  WUCKMAN SEASON 02  ///  LIMITED QUANTITIES  ///
                    </span>
                ))}
            </div>
        </motion.div>
    );
};

export default DropCountdown;
