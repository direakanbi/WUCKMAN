import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const DUMMY_PRODUCTS = [
    {
        id: 1,
        title: "Toxic Love Tee",
        price: "$85.00",
        image1: "https://pngimg.com/uploads/tshirt/tshirt_PNG5448.png", // Black tee
        image2: "https://pngimg.com/uploads/tshirt/tshirt_PNG5450.png", // Back/Alt view
        soldOut: false
    },
    {
        id: 2,
        title: "Acid Wash Denim",
        price: "$220.00",
        image1: "https://pngimg.com/uploads/jeans/jeans_PNG5775.png", // Jeans
        soldOut: false
    },
    {
        id: 3,
        title: "Leather Racer Jacket",
        price: "$450.00",
        image1: "https://pngimg.com/uploads/jacket/jacket_PNG8051.png", // Leather jacket
        image2: "https://pngimg.com/uploads/jacket/jacket_PNG8056.png",
        soldOut: true
    },
    {
        id: 4,
        title: "Cyber Cargo Pants",
        price: "$180.00",
        image1: "https://pngimg.com/uploads/jeans/jeans_PNG5775.png", // Fallback to Jeans
        soldOut: false
    },
    {
        id: 5,
        title: "Distressed Knit",
        price: "$140.00",
        image1: "https://pngimg.com/uploads/jacket/jacket_PNG8051.png", // Fallback to Jacket
        soldOut: false
    },
    {
        id: 6,
        title: "Shell Parka",
        price: "$320.00",
        image1: "https://pngimg.com/uploads/jacket/jacket_PNG8051.png", // Fallback to Jacket
        soldOut: false
    },
    {
        id: 7,
        title: "Logo Cap",
        price: "$55.00",
        image1: "https://pngimg.com/uploads/tshirt/tshirt_PNG5448.png", // Fallback to Tee (Cap URL broken)
        soldOut: false
    },
    {
        id: 8,
        title: "Utility Vest",
        price: "$195.00",
        image1: "https://pngimg.com/uploads/jacket/jacket_PNG8051.png",
        soldOut: true
    }
];

const ProductGrid = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const [width, setWidth] = useState(0);
    const [isDesktop, setIsDesktop] = useState(false);

    // Desktop detection
    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
        }
    }, []);

    // Scroll Parallax
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

    return (
        <section ref={sectionRef} className="py-20 bg-brand-black w-full relative z-10 overflow-hidden">
            <div className="px-4 md:px-8 flex justify-between items-end mb-12 border-b border-white/10 pb-4">
                <h2 className="text-4xl md:text-6xl font-heading text-white uppercase tracking-tighter">
                    New Arrivals
                </h2>
                <div className="text-brand-red font-body uppercase tracking-widest text-sm md:text-base hidden md:block">
                    FW25 Collection
                </div>
            </div>

            {/* Draggable Conveyor - Moves with scroll on desktop */}
            <motion.div
                className="relative w-full"
                ref={containerRef}
                style={{ x: isDesktop ? x : 0 }}
            >
                {/* Drag Hint */}
                <div className="absolute -top-8 right-4 text-white/40 text-xs tracking-[0.3em] font-body uppercase animate-pulse">
                    &lt; DRAG &gt;
                </div>

                <motion.div
                    className="flex gap-8 px-4 md:px-8 w-max cursor-grab active:cursor-grabbing"
                    drag="x"
                    dragConstraints={{ right: 0, left: -width }}
                    whileTap={{ cursor: "grabbing" }}
                >
                    {DUMMY_PRODUCTS.map((product) => (
                        <div key={product.id} className="w-[300px] md:w-[400px] flex-shrink-0">
                            <ProductCard
                                id={product.id}
                                title={product.title}
                                price={product.price}
                                image1={product.image1}
                                image2={product.image2}
                                soldOut={product.soldOut}
                            />
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default ProductGrid;
