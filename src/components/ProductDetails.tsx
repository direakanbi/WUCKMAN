import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';

// Merged mock data from ProductGrid to ensure consistency
// UPDATED: Using transparent PNGs mostly from pngimg.com for "backgroundless" effect
const PRODUCTS: Record<string, any> = {
    "1": { title: "Toxic Love Tee", price: "$85.00", image: "https://pngimg.com/uploads/tshirt/tshirt_PNG5448.png", description: "Heavyweight cotton tee with acid wash finish. Oversized fit." },
    "2": { title: "Acid Wash Denim", price: "$220.00", image: "https://pngimg.com/uploads/jeans/jeans_PNG5775.png", description: "Straight leg denim with distressed details and custom hardware." },
    "3": { title: "Leather Racer Jacket", price: "$450.00", image: "https://pngimg.com/uploads/jacket/jacket_PNG8051.png", description: "Genuine leather racer jacket with padded shoulders and vintage treatment." },
    "4": { title: "Cyber Cargo Pants", price: "$180.00", image: "https://pngimg.com/uploads/jeans/jeans_PNG5775.png", description: "Tech-wear inspired cargo pants with multiple distinct pockets and adjustable straps." },
    "5": { title: "Distressed Knit", price: "$140.00", image: "https://pngimg.com/uploads/jacket/jacket_PNG8051.png", description: "Hand-distressed knit sweater. 100% loose gauge wool." },
    "6": { title: "Shell Parka", price: "$320.00", image: "https://pngimg.com/uploads/jacket/jacket_PNG8051.png", description: "Water-resistant shell parka with extended length and tactical hood." },
    "7": { title: "Logo Cap", price: "$55.00", image: "https://pngimg.com/uploads/tshirt/tshirt_PNG5448.png", description: "Classic 6-panel cap with 3D embroidered logo." },
    "8": { title: "Utility Vest", price: "$195.00", image: "https://pngimg.com/uploads/jacket/jacket_PNG8051.png", description: "Functional utility vest with modular attachments." },
    "default": { title: "Product Not Found", price: "$0.00", image: "", description: "The requested product does not exist." }
};

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addItem, openCart } = useCartStore();

    // Find product or fallback
    const product = PRODUCTS[id || ""] || PRODUCTS["default"];

    const handleAddToCart = () => {
        addItem({
            id: id || "unknown",
            title: product.title,
            price: product.price,
            image: product.image,
            size: "M" // Default size for prototype
        });
        openCart();
    };

    if (product.title === "Product Not Found") {
        return (
            <section className="pt-32 pb-20 px-4 md:px-8 bg-brand-black min-h-screen flex flex-col items-center justify-center text-white">
                <h1 className="text-4xl font-heading mb-4">PRODUCT NOT FOUND</h1>
                <button onClick={() => navigate('/')} className="text-brand-red font-body underline">Return Home</button>
            </section>
        )
    }

    return (
        <section className="pt-32 pb-20 px-4 md:px-8 bg-brand-black min-h-screen">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-white/60 hover:text-brand-red transition-colors mb-8 font-heading uppercase tracking-widest text-sm"
            >
                <ArrowLeft size={16} /> Back
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Image Gallery (Placeholder) */}
                <div className="aspect-[3/4] w-full relative overflow-hidden">
                    <motion.img
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain p-8"
                    />
                </div>

                {/* Details */}
                <div className="flex flex-col justify-center">
                    <h1 className="text-4xl md:text-6xl font-heading text-white uppercase tracking-tighter mb-4">
                        {product.title}
                    </h1>
                    <p className="text-2xl font-body text-brand-red tracking-widest mb-8">
                        {product.price}
                    </p>

                    <p className="font-body text-white/60 leading-relaxed max-w-md mb-8">
                        {product.description}
                        <br /><br />
                        Designed in the underground bunkers of Wuckman functionality.
                        Premium material composition.
                    </p>

                    {/* Size Selector */}
                    <div className="mb-8">
                        <span className="block font-heading text-sm text-white uppercase mb-2">Size</span>
                        <div className="flex gap-2">
                            {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                                <button key={size} className="w-12 h-12 border border-white/20 text-white hover:border-brand-red hover:bg-brand-red/10 transition-colors font-body">
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="bg-brand-white text-brand-black px-8 py-4 font-heading text-xl uppercase tracking-wider hover:bg-brand-red hover:text-white transition-all w-full md:w-auto flex items-center justify-center gap-2"
                    >
                        <ShoppingBag size={20} /> Add to Cart
                    </button>

                    <div className="mt-6 flex items-center gap-2 text-green-400 font-body text-xs tracking-widest uppercase">
                        <Star size={12} fill="currentColor" /> In Stock - Ready to Ship
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;
