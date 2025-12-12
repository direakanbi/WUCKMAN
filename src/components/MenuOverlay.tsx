import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Twitter, Facebook } from 'lucide-react';

interface MenuOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigate: (view: 'home' | 'shop') => void;
    currentView: 'home' | 'shop';
}

const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'shop', label: 'SHOP ALL' },
    { id: 'new', label: 'NEW ARRIVALS' }, // For now, just a placeholder or specific anchor
    { id: 'account', label: 'ACCOUNT' },
];

const MenuOverlay = ({ isOpen, onClose, onNavigate, currentView }: MenuOverlayProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-50 bg-brand-black flex flex-col"
                >
                    {/* Header in Overlay */}
                    <div className="h-20 px-4 flex items-center justify-between border-b border-white/10">
                        <span className="font-body text-sm tracking-widest opacity-60">MENU</span>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-brand-red hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Links */}
                    <div className="flex-1 flex flex-col justify-center items-center gap-8">
                        {navItems.map((item) => (
                            <motion.button
                                key={item.id}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                onClick={() => {
                                    if (item.id === 'shop' || item.id === 'home') {
                                        onNavigate(item.id as 'home' | 'shop');
                                    }
                                    onClose();
                                }}
                                className={`font-heading text-5xl md:text-7xl uppercase tracking-tighter hover:text-brand-red transition-colors relative group ${currentView === item.id ? 'text-brand-red' : 'text-white'
                                    }`}
                            >
                                {item.label}
                                <span className="absolute -left-8 top-1/2 -translate-y-1/2 w-4 h-4 bg-brand-red rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.button>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="p-8 border-t border-white/10 flex justify-between items-end">
                        <div className="flex gap-6">
                            <Instagram className="cursor-pointer hover:text-brand-red transition-colors" />
                            <Twitter className="cursor-pointer hover:text-brand-red transition-colors" />
                            <Facebook className="cursor-pointer hover:text-brand-red transition-colors" />
                        </div>
                        <span className="font-body text-xs tracking-widest opacity-40">
                            © 2025 WUCKMAN.
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MenuOverlay;
