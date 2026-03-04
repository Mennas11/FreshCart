import { createContext, useContext, useEffect, useState } from "react";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const raw = localStorage.getItem("freshcart_wishlist");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("freshcart_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      // ignore
    }
  }, [wishlist]);

  const addItem = (product) => {
    setWishlist((prev) => {
      const id = product._id || product.id;
      const exists = prev.find((p) => (p._id || p.id) === id);
      if (exists) {
        return prev; // Already in wishlist
      }
      const item = {
        _id: id,
        title: product.title || product.name || "Item",
        image: product.imageCover || product.image || null,
        price: product.priceAfterDiscount || product.price || 0,
        originalPrice: product.price || 0,
        category: product.category?.name || "",
        rating: product.ratingsAverage || 0,
      };
      return [...prev, item];
    });
  };

  const removeItem = (id) => {
    setWishlist((prev) => prev.filter((p) => (p._id || p.id) !== id));
  };

  const isInWishlist = (id) => {
    return wishlist.some((p) => (p._id || p.id) === id);
  };

  const clearWishlist = () => setWishlist([]);

  const totalItems = wishlist.length;

  return (
    <WishlistContext.Provider value={{ wishlist, addItem, removeItem, isInWishlist, clearWishlist, totalItems }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
