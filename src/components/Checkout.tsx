import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';

const Checkout = () => {
    const navigate = useNavigate();
    const { items, clearCart } = useCartStore();
    const total = items.reduce((acc, item) => acc + parseFloat(item.price.replace('$', '')) * item.quantity, 0);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setTimeout(() => {
            clearCart();
            alert("ORDER CONFIRMED /// WELCOME TO THE UNDERGROUND");
            navigate('/');
        }, 2000);
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-brand-black pt-32 px-4 flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl font-heading text-white mb-4">YOUR BAG IS EMPTY</h1>
                <button onClick={() => navigate('/shop')} className="text-brand-red font-body underline">Back to Shop</button>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-brand-black pt-32 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-heading text-white mb-12 uppercase tracking-tighter">
                Secure Checkout
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div>
                        <label className="block text-brand-red text-sm font-heading mb-2 uppercase tracking-widest">Email</label>
                        <input type="email" required className="w-full bg-transparent border border-white/20 p-4 text-white font-body focus:border-brand-red outline-none transition-colors rounded-none placeholder:text-white/20" placeholder="YOU@EXAMPLE.COM" />
                    </div>

                    <div>
                        <label className="block text-brand-red text-sm font-heading mb-2 uppercase tracking-widest">Shipping Address</label>
                        <input type="text" required className="w-full bg-transparent border border-white/20 p-4 text-white font-body focus:border-brand-red outline-none transition-colors rounded-none placeholder:text-white/20 mb-4" placeholder="STREET ADDRESS" />
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" required className="w-full bg-transparent border border-white/20 p-4 text-white font-body focus:border-brand-red outline-none transition-colors rounded-none placeholder:text-white/20" placeholder="CITY" />
                            <input type="text" required className="w-full bg-transparent border border-white/20 p-4 text-white font-body focus:border-brand-red outline-none transition-colors rounded-none placeholder:text-white/20" placeholder="POSTAL CODE" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-brand-red text-sm font-heading mb-2 uppercase tracking-widest">Payment</label>
                        <div className="border border-white/20 p-4 flex items-center gap-4 mb-4 opacity-50 cursor-not-allowed">
                            <div className="w-4 h-4 rounded-full border border-white bg-white"></div>
                            <span className="font-body text-white uppercase tracking-wider">Credit Card (Mock)</span>
                        </div>
                        <input type="text" disabled className="w-full bg-white/5 border border-white/10 p-4 text-white/40 font-body rounded-none cursor-not-allowed" placeholder="0000 0000 0000 0000" />
                    </div>

                    <button
                        type="submit"
                        disabled={isProcessing}
                        className="bg-brand-white text-brand-black px-8 py-5 font-heading text-xl uppercase tracking-wider hover:bg-brand-red hover:text-white transition-all mt-8 disabled:opacity-50 disabled:cursor-wait"
                    >
                        {isProcessing ? "PROCESSING..." : `PAY $${total.toFixed(2)}`}
                    </button>
                </form>

                {/* Order Summary */}
                <div className="bg-white/5 p-8 h-fit border border-white/10">
                    <h3 className="font-heading text-2xl text-white mb-8 uppercase">Order Summary</h3>
                    <div className="flex flex-col gap-6 mb-8">
                        {items.map((item) => (
                            <div key={`${item.id}-${item.size}`} className="flex gap-4">
                                <div className="w-20 h-24 bg-brand-black border border-white/20 relative overflow-hidden">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-contain p-2" />
                                </div>
                                <div>
                                    <p className="font-heading text-white uppercase text-lg leading-none mb-1">{item.title}</p>
                                    <p className="font-body text-white/60 text-sm mb-2">{item.price} x {item.quantity}</p>
                                    <p className="font-body text-brand-red text-xs border border-brand-red/40 px-2 py-0.5 w-max">SIZE: {item.size}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-white/10 pt-6 flex justify-between items-center">
                        <span className="font-heading text-white text-xl uppercase">Total</span>
                        <span className="font-heading text-brand-red text-2xl uppercase">${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Checkout;
