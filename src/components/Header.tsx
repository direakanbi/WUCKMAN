import { motion } from 'framer-motion';
import { ShoppingBag, Menu } from 'lucide-react';
import logo from '../assets/logo.png';
import { useCartStore } from '../store/useCartStore';

interface HeaderProps {
    onOpenMenu: () => void;
}

const Header = ({ onOpenMenu }: HeaderProps) => {
    const { openCart, items } = useCartStore();
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 w-full z-50 bg-brand-black/90 backdrop-blur-sm border-b border-brand-white/10"
        >
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Left: Menu (Mobile/Desktop Unconventional) */}
                <div className="flex items-center gap-4">
                    <button
                        className="p-2 hover:bg-brand-white hover:text-brand-black transition-colors rounded-none"
                        onClick={onOpenMenu}
                    >
                        <Menu size={24} />
                    </button>
                    <span className="hidden md:block font-body text-sm tracking-widest opacity-60">EST. 2025</span>
                </div>

                {/* Center: Logo */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <img src={logo} alt="Wuckman" className="h-12 md:h-16 object-contain cursor-pointer hover:scale-105 transition-transform" />
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-6">
                    <button className="hidden md:flex items-center gap-2 hover:text-brand-red transition-colors">
                        <span className="font-heading text-lg">ACCOUNT</span>
                    </button>
                    <button
                        className="relative p-2 group"
                        onClick={openCart}
                    >
                        <ShoppingBag size={24} className="group-hover:text-brand-red transition-colors" />
                        {items.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] w-4 h-4 flex items-center justify-center font-bold rounded-full">
                                {items.length}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
