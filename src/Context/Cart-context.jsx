import { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("freshcart_cart");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("freshcart_cart", JSON.stringify(cart));
    } catch (e) {
      // ignore
    }
  }, [cart]);

  const addItem = (product, qty = 1) => {
    console.log('Cart.addItem called', { id: product._id || product.id, qty })
    setCart((prev) => {
      const id = product._id || product.id;
      const existing = prev.find((p) => (p._id || p.id) === id);
      if (existing) {
        return prev.map((p) =>
          (p._id || p.id) === id
            ? { ...p, quantity: Math.min((p.quantity || 0) + qty, product.quantity || 999) }
            : p
        );
      }
      const item = {
        _id: id,
        title: product.title || product.name || "Item",
        image: product.imageCover || product.image || null,
        price: product.priceAfterDiscount || product.price || 0,
        maxQuantity: product.quantity || 999,
        quantity: qty,
      };
      return [...prev, item];
    });
    try { window.__freshcart_lastAdd = { product, qty } } catch(e){}
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((p) => (p._id || p.id) !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev
        .map((p) => ((p._id || p.id) === id ? { ...p, quantity: Math.max(1, Math.min(p.maxQuantity || 999, quantity)) } : p))
        .filter(Boolean)
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((s, it) => s + (it.quantity || 0), 0);
  const subtotal = cart.reduce((s, it) => s + (it.price || 0) * (it.quantity || 0), 0);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
