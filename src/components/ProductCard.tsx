import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';

interface ProductCardProps {
    id: number | string;
    title: string;
    price: string;
    image1: string;
    image2?: string;
    soldOut?: boolean;
    className?: string;
}

const ProductCard = ({ id, title, price, image1, image2, soldOut, className }: ProductCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link
            to={`/product/${id}`}
            className={cn("group cursor-pointer flex flex-col gap-3", className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative aspect-[3/4] overflow-hidden w-full">
                {soldOut && (
                    <div className="absolute top-2 right-2 z-20 bg-brand-red text-white px-2 py-1 text-xs font-heading tracking-widest uppercase">
                        Sold Out
                    </div>
                )}

                <div className="w-full h-full relative">
                    {/* Primary Image with Glitch Effect on Hover */}
                    <div className="absolute inset-0 w-full h-full">
                        {/* Base Image */}
                        <motion.img
                            src={image1}
                            alt={title}
                            className="absolute inset-0 w-full h-full object-contain p-4 transition-opacity duration-300 z-10"
                            style={{ opacity: isHovered && image2 ? 0 : 1 }}
                        />


                    </div>

                    {image2 && (
                        <motion.img
                            src={image2}
                            alt={`${title} alternate`}
                            className="absolute inset-0 w-full h-full object-contain p-4 transition-opacity duration-300 z-20"
                            style={{ opacity: isHovered ? 1 : 0 }}
                        />
                    )}


                </div>
            </div>

            <div className="flex flex-col gap-1 px-1">
                <h3 className="font-heading text-lg md:text-xl uppercase tracking-wide leading-none text-white group-hover:text-brand-red transition-colors">
                    {title}
                </h3>
                <p className="font-body text-sm text-white/60 tracking-wider">
                    {price}
                </p>
            </div>
        </Link>
    );
};

export default ProductCard;
