import { useState } from 'react';
import ProductCard from './ProductCard';
import { Filter } from 'lucide-react';
import { cn } from '../utils/cn';

const FILTERS = {
    categories: ['T-Shirts', 'Outerwear', 'Pants', 'Accessories'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    sort: ['Newest', 'Price: Low to High', 'Price: High to Low']
};

const ALL_PRODUCTS = [
    {
        id: 1,
        title: "Toxic Love Tee",
        price: "$85.00",
        image1: "https://pngimg.com/uploads/tshirt/tshirt_PNG5448.png",
        image2: "https://pngimg.com/uploads/tshirt/tshirt_PNG5450.png",
        soldOut: false
    },
    {
        id: 2,
        title: "Acid Wash Denim",
        price: "$220.00",
        image1: "https://pngimg.com/uploads/jeans/jeans_PNG5775.png",
        soldOut: false
    },
    {
        id: 3,
        title: "Leather Racer Jacket",
        price: "$450.00",
        image1: "https://pngimg.com/uploads/jacket/jacket_PNG8051.png",
        image2: "https://pngimg.com/uploads/jacket/jacket_PNG8056.png",
        soldOut: true
    },
    {
        id: 4,
        title: "Cyber Cargo Pants",
        price: "$180.00",
        image1: "https://pngimg.com/uploads/jeans/jeans_PNG5775.png",
        soldOut: false
    },
    {
        id: 5,
        title: "Distressed Knit",
        price: "$140.00",
        image1: "https://pngimg.com/uploads/jacket/jacket_PNG8051.png",
        soldOut: false
    },
    {
        id: 6,
        title: "Shell Parka",
        price: "$320.00",
        image1: "https://pngimg.com/uploads/jacket/jacket_PNG8051.png",
        soldOut: false
    },
    {
        id: 7,
        title: "Logo Cap",
        price: "$55.00",
        image1: "https://pngimg.com/uploads/tshirt/tshirt_PNG5448.png",
        soldOut: false
    },
    {
        id: 8,
        title: "Utility Vest",
        price: "$195.00",
        image1: "https://pngimg.com/uploads/jacket/jacket_PNG8051.png",
        soldOut: true
    },
    // Duplicating for "Shop All" volume
    {
        id: 9,
        title: "Oversized Hoodie",
        price: "$160.00",
        image1: "https://pngimg.com/uploads/hoodie/hoodie_PNG12.png",
        soldOut: false
    },
    {
        id: 10,
        title: "Mesh Top",
        price: "$95.00",
        image1: "https://pngimg.com/uploads/tshirt/tshirt_PNG5434.png", // Black fitted tee
        soldOut: false
    }
];

import shopBg from '../assets/shop-bg.jpg';

const ShopAll = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    return (
        <section className="pt-32 pb-20 px-4 md:px-8 bg-brand-black min-h-screen relative overflow-hidden">
            {/* Background Image - Optimized for "Cyber" Lo-Fi Look */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* 1. The Image: Pixelated rendering prevents blurry interpolation */}
                <img
                    src={shopBg}
                    alt="Shop Background"
                    className="w-full h-full object-cover fixed inset-0 opacity-60"
                    style={{ imageRendering: 'pixelated' }}
                />

                {/* 2. CRT Scanline Overlay: Masks resolution artifacts */}
                <div
                    className="absolute inset-0 z-[1] opacity-30"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 3px)'
                    }}
                ></div>

                {/* 3. Vignette & Darkening */}
                <div className="absolute inset-0 bg-brand-black/70 z-[2]"></div>

                {/* 4. Noise texture (keep subtle) */}
                <div className="absolute inset-0 bg-noise opacity-[0.10] mix-blend-overlay z-[3]"></div>
            </div>

            <div className="flex flex-col md:flex-row gap-12 relative z-10">

                {/* Mobile Filter Toggle */}
                <button
                    className="md:hidden flex items-center gap-2 text-white font-heading uppercase tracking-widest border border-white/20 px-4 py-2 w-max"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                    <Filter size={16} /> Filters
                </button>

                {/* Sidebar Filters */}
                <aside className={cn(
                    "w-full md:w-64 flex-shrink-0 flex flex-col gap-8 md:sticky md:top-32 h-fit transition-all duration-300 overflow-hidden md:overflow-visible",
                    isFilterOpen ? "max-h-[500px]" : "max-h-0 md:max-h-none opacity-0 md:opacity-100"
                )}>
                    <div>
                        <h3 className="font-heading text-lg text-white mb-4 uppercase">Category</h3>
                        <ul className="flex flex-col gap-2 font-body text-white/60 text-sm tracking-wider">
                            {FILTERS.categories.map(cat => (
                                <li key={cat} className="hover:text-brand-red cursor-pointer transition-colors max-w-max">
                                    {cat}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-heading text-lg text-white mb-4 uppercase">Size</h3>
                        <div className="flex flex-wrap gap-2">
                            {FILTERS.sizes.map(size => (
                                <button key={size} className="w-10 h-10 border border-white/20 text-white/60 font-body text-xs hover:border-brand-red hover:text-brand-red transition-colors">
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-heading text-lg text-white mb-4 uppercase">Sort By</h3>
                        <ul className="flex flex-col gap-2 font-body text-white/60 text-sm tracking-wider">
                            {FILTERS.sort.map(opt => (
                                <li key={opt} className="hover:text-brand-red cursor-pointer transition-colors max-w-max">
                                    {opt}
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* Product Masonry Grid */}
                <div className="flex-1">
                    <div className="columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                        {ALL_PRODUCTS.map((product, index) => {
                            // Inject lifestyle/video blocks at specific indices
                            const showLifestyle1 = index === 2;
                            const showLifestyle2 = index === 7;

                            return (
                                <div key={product.id} className="break-inside-avoid">
                                    {showLifestyle1 && (
                                        <div className="w-full aspect-[3/4] bg-brand-red mb-4 flex items-center justify-center text-center p-4 relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-noise opacity-20 z-10 mix-blend-overlay"></div>
                                            <h3 className="font-heading text-4xl text-black uppercase relative z-20 leading-none group-hover:scale-110 transition-transform duration-500">
                                                Visual<br />Noise
                                            </h3>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                        </div>
                                    )}

                                    <ProductCard
                                        id={product.id}
                                        title={product.title}
                                        price={product.price}
                                        image1={product.image1}
                                        image2={product.image2}
                                        soldOut={product.soldOut}
                                        className="mb-4"
                                    />

                                    {showLifestyle2 && (
                                        <div className="w-full aspect-square bg-white mb-4 flex items-center justify-center text-center p-4 relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-noise opacity-10 z-10"></div>
                                            <h3 className="font-heading text-4xl text-brand-black uppercase relative z-20 leading-none tracking-tighter">
                                                Look<br />Book<br />'25
                                            </h3>
                                            <div className="absolute bottom-2 right-2 text-xs font-body uppercase text-brand-black/50">
                                                [ View Campaign ]
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ShopAll;
