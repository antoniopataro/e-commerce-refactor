import { useState, createContext } from "react";

import { ProductProps } from "@components/Product";

interface WishlistContextProps {
  wishlist: ProductProps[];
  addToWishlist: (product: ProductProps) => void;
  removeFromWishlist: (productId: string) => void;
}

export const WishlistContext = createContext({} as WishlistContextProps);

interface Props {
  children: React.ReactNode;
}

function WishlistProvider({ children }: Props) {
  const [wishlist, setWishlist] = useState<ProductProps[]>([]);

  const addToWishlist = (product: ProductProps) => {
    if (wishlist.map((p) => p.id).includes(product.id)) {
      setWishlist(
        wishlist.map((p) => {
          if (p.id === product.id) {
            return p;
          }
          return p;
        }),
      );

      return;
    }

    setWishlist([...wishlist, product]);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(
      wishlist.filter((p) => {
        if (p.id === productId) {
          return;
        }
        return p;
      }),
    );
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;
