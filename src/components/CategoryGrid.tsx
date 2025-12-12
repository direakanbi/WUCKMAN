import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const CATEGORIES = [
    { title: "Tops", image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=2787&auto=format&fit=crop" },
    { title: "Bottoms", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=2787&auto=format&fit=crop" },
    { title: "Accessories", image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=2940&auto=format&fit=crop" }
];

const CategoryGrid = () => {
    return (
        <section className="py-0 bg-brand-black grid grid-cols-1 md:grid-cols-3 h-[50vh] md:h-[80vh]">
            {CATEGORIES.map((cat, index) => (
                <Link to="/shop" key={cat.title} className="relative group overflow-hidden block h-full">
                    <motion.div
                        className="absolute inset-0 z-0"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <img
                            src={cat.image}
                            alt={cat.title}
                            className="w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity"
                        />
                    </motion.div>

                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                        <h3 className="text-4xl md:text-5xl font-heading text-white uppercase tracking-tighter group-hover:tracking-widest transition-all duration-500 relative inline-block">
                            {cat.title}
                            <img
                                src={logo}
                                alt="TM"
                                className="absolute -top-4 -right-6 w-8 h-auto -rotate-12 opacity-90"
                            />
                        </h3>
                    </div>

                    {/* Glitch Overlay Effect on Hover */}
                    <div className="absolute inset-0 bg-brand-red/20 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-100" />
                </Link>
            ))}
        </section>
    );
};

export default CategoryGrid;
