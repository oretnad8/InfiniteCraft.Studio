
'use client';

import { useCart } from '../hooks/useCart';
import FloatingCart from './FloatingCart';
import Cart from './Cart';
import Checkout from './Checkout';

export default function CartProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    items,
    isCartOpen,
    isCheckoutOpen,
    getTotalItems,
    getTotal,
    updateQuantity,
    removeItem,
    clearCart,
    openCart,
    closeCart,
    openCheckout,
    closeCheckout,
    handleOrderComplete
  } = useCart();

  return (
    <>
      {children}

      <FloatingCart
        itemCount={getTotalItems()}
        onClick={openCart}
      />

      <Cart
        isOpen={isCartOpen}
        onClose={closeCart}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
        onCheckout={openCheckout}
      />

      <Checkout
        isOpen={isCheckoutOpen}
        onClose={closeCheckout}
        items={items}
        total={getTotal()}
        onOrderComplete={handleOrderComplete}
      />
    </>
  );
}
