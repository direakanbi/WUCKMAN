import { create } from 'zustand';

export interface CartItem {
    id: string;
    title: string;
    price: string; // Should be number in real app, but using string for prototype
    image: string;
    size: string;
    quantity: number;
}

interface CartStore {
    isOpen: boolean;
    items: CartItem[];
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
    isOpen: false,
    items: [],
    openCart: () => set({ isOpen: true }),
    closeCart: () => set({ isOpen: false }),
    toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    addItem: (newItem) => set((state) => {
        const existingItem = state.items.find(item => item.id === newItem.id && item.size === newItem.size);
        if (existingItem) {
            return {
                items: state.items.map(item =>
                    (item.id === newItem.id && item.size === newItem.size)
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            };
        }
        return { items: [...state.items, { ...newItem, quantity: 1 }] };
    }),
    removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
    })),
    updateQuantity: (id, delta) => set((state) => ({
        items: state.items.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQuantity };
            }
            return item;
        })
    })),
    clearCart: () => set({ items: [] })
}));
