import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Newsletter = () => {
    return (
        <section className="py-20 md:py-32 bg-brand-black text-white relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl md:text-8xl font-heading uppercase mb-8 leading-none">
                        Join The <span className="text-brand-red">Cult</span>.
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto mb-12 text-lg font-mono">
                        Be the first to know about exclusive drops, secret sales, and limited edition releases. No spam, just heat.
                    </p>

                    <form className="max-w-md mx-auto flex border-b-2 border-white focus-within:border-brand-red transition-colors pb-2">
                        <input
                            type="email"
                            placeholder="ENTER YOUR EMAIL"
                            className="bg-transparent w-full text-xl font-heading uppercase placeholder:text-white/30 focus:outline-none text-white tracking-wider"
                        />
                        <button type="submit" className="text-white hover:text-brand-red transition-colors">
                            <ArrowRight size={32} />
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Newsletter;
