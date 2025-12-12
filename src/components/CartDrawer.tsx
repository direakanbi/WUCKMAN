import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useNavigate } from 'react-router-dom';

const CartDrawer = () => {
    const { isOpen, closeCart, items, removeItem } = useCartStore();
    const navigate = useNavigate();

    const total = items.reduce((acc, item) => acc + parseFloat(item.price.replace('$', '')) * item.quantity, 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-brand-black border-l border-white/10 z-[70] flex flex-col"
                    >
                        {/* Header */}
                        <div className="h-20 px-6 flex items-center justify-between border-b border-white/10">
                            <span className="font-heading text-xl uppercase tracking-wider">Cart ({items.length})</span>
                            <button
                                onClick={closeCart}
                                className="p-2 hover:bg-brand-red hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                            {items.length === 0 ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-white/40 gap-4">
                                    <ShoppingBag size={48} />
                                    <p className="font-body text-lg uppercase tracking-widest">Your cart is empty</p>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={`${item.id}-${item.size}`} className="flex gap-4">
                                        <div className="w-20 h-24 bg-brand-black border border-white/20 relative overflow-hidden flex-shrink-0">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-contain p-2" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h4 className="font-heading text-lg uppercase tracking-wide leading-none mb-1">{item.title}</h4>
                                                <p className="font-body text-sm text-white/60">Size: {item.size}</p>
                                            </div>
                                            <div className="flex justify-between items-end">
                                                <p className="font-body text-brand-red tracking-wider">{item.price}</p>
                                                <div className="flex items-center gap-4">
                                                    {/* Quantity Logic could go here, but keeping it simple for now */}
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-white/40 hover:text-brand-red transition-colors"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-white/10 bg-brand-black">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="font-heading text-xl uppercase tracking-wider text-white">Subtotal</span>
                                    <span className="font-heading text-xl text-brand-red">${total.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={() => {
                                        closeCart();
                                        navigate('/checkout');
                                    }}
                                    className="w-full bg-white text-brand-black py-4 font-heading uppercase tracking-widest hover:bg-brand-red hover:text-white transition-colors"
                                >
                                    Checkout
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
