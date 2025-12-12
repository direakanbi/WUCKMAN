import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const FeaturedLook = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    return (
        <section ref={ref} className="group relative h-screen w-full overflow-hidden bg-brand-black text-white">
            <motion.div
                className="absolute inset-0 z-0 bg-brand-black"
                style={{ y, scale }}
            >
                <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop"
                    alt="Featured Look"
                    className="w-full h-full object-cover opacity-60 grayscale group-hover:opacity-0 transition-opacity duration-700 ease-in-out relative z-10"
                />
                <video
                    src="https://assets.mixkit.co/videos/preview/mixkit-urban-model-wearing-sunglasses-in-neon-light-40742-large.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out z-0"
                />
            </motion.div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent z-[1]" />

            <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-brand-red font-mono tracking-widest uppercase mb-4 block">Editorial Vol. 04</span>
                    <h2 className="text-6xl md:text-9xl font-heading uppercase leading-[0.8] mb-8">
                        Urban<br /><span className="text-transparent stroke-text text-stroke-white">Decay</span>
                    </h2>

                    <Link to="/shop" className="group inline-flex items-center gap-4 text-xl uppercase tracking-widest border-b border-white pb-2 hover:text-brand-red hover:border-brand-red transition-colors">
                        Shop The Look
                        <ArrowUpRight className="group-hover:rotate-45 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedLook;
