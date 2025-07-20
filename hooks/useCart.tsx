
'use client';

import { useState, useEffect, createContext, useContext } from 'react';

interface CartItem {
  id: string;
  name: string;
  size: string;
  finish: string;
  price: number;
  quantity: number;
  type: 'stock' | 'custom';
  image?: string;
  category?: string;
  comments?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getDiscount: () => number;
  getTotal: () => number;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  handleOrderComplete: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Cargar carrito del localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('8craft-cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (error) {
      console.error('Error cargando carrito:', error);
    }
    setMounted(true);
  }, []);

  // Guardar carrito en localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('8craft-cart', JSON.stringify(items));
    }
  }, [items, mounted]);

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(currentItems => {
      // Para productos personalizados, siempre agregar como nuevo
      if (newItem.type === 'custom') {
        const item = { ...newItem, quantity: 1 };
        return [...currentItems, item];
      }

      // Para productos de catálogo, verificar si ya existe
      const existing = currentItems.find(item => 
        item.name === newItem.name && 
        item.size === newItem.size && 
        item.finish === newItem.finish &&
        item.type === 'stock'
      );

      if (existing) {
        return currentItems.map(item =>
          item.id === existing.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const item = { ...newItem, quantity: 1 };
        return [...currentItems, item];
      }
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDiscount = () => {
    return items.length >= 3 ? getSubtotal() * 0.15 : 0;
  };

  const getTotal = () => {
    return getSubtotal() - getDiscount();
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };
  const closeCheckout = () => setIsCheckoutOpen(false);
  const handleOrderComplete = () => {
    clearCart();
    closeCheckout();
  };

  const value = {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalItems,
    getSubtotal,
    getDiscount,
    getTotal,
    isCartOpen,
    isCheckoutOpen,
    openCart,
    closeCart,
    openCheckout,
    closeCheckout,
    handleOrderComplete
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
}
