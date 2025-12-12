import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import heroImage from '../assets/hero-sec-image.png';
import logo from '../assets/logo.png';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Marquee from './Marquee';

const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    // Parallax effect: content moves faster than background
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section ref={ref} className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-brand-black">
            {/* Background Image with Parallax */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0"
            >
                <img src={heroImage} alt="Hero Background" className="w-full h-full object-cover opacity-80" />
            </motion.div>

            {/* Noise Overlay */}
            <div className="absolute inset-0 bg-noise opacity-[0.15] z-[1] pointer-events-none mix-blend-overlay"></div>

            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent z-[2] pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-[90vw] flex flex-col justify-center items-center px-4">

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-8 relative z-20"
                >
                    <img
                        src={logo}
                        alt="Wuckman Logo"
                        className="w-[60vw] md:w-[40vw] max-w-[600px] h-auto drop-shadow-2xl"
                    />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: -2 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-xl md:text-3xl font-graffiti tracking-wide mt-2 mb-12 text-center text-white/80 drop-shadow-lg"
                >
                    Wild Unruly Crazy Kids Make Art Notable
                </motion.p>

                <Link to="/shop">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group bg-brand-red text-white px-8 py-4 font-heading text-2xl uppercase tracking-wider flex items-center gap-4 hover:bg-white hover:text-brand-black transition-all cursor-pointer"
                    >
                        Enter Store
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                </Link>
            </div>

            <div className="absolute bottom-12 w-full -rotate-2 scale-105 opacity-80">
                <Marquee>
                    <span className="text-5xl md:text-7xl font-heading mx-12">NO RESTOCK</span>
                    <span className="text-5xl md:text-7xl font-heading mx-12 text-brand-red">WORLDWIDE SHIPPING</span>
                    <span className="text-5xl md:text-7xl font-heading mx-12">LIMITED EDITION</span>
                    <span className="text-5xl md:text-7xl font-heading mx-12 text-brand-red">F/W 2025</span>
                </Marquee>
            </div>
        </section >
    );
};

export default Hero;
