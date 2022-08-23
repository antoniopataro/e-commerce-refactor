import { useState, createContext } from "react";

import { ProductProps } from "@components/Product";

export interface CartProps {
  id: string;
  name: string;
  price: number;
  categoryName: string;
  imageUrl: string;
  quantity: number;
  total: number;
}

interface CartContextProps {
  cart: CartProps[];
  addToCart: (product: CartProps | ProductProps) => void;
  removeFromCart: (productId: string) => void;
  removeMultipleProductsFromCart: (productId: string) => void;
}

export const CartContext = createContext({} as CartContextProps);

interface Props {
  children: React.ReactNode;
}

function CartProvider({ children }: Props) {
  const [cart, setCart] = useState<CartProps[]>([]);

  const addToCart = (product: CartProps | ProductProps) => {
    if (cart.map((p) => p.id).includes(product.id)) {
      setCart(
        cart.map((p) => {
          if (p.id === product.id) {
            return {
              ...p,
              quantity: p.quantity + 1,
              total: p.total + product.price,
            };
          }
          return p;
        }),
      );

      return;
    }

    setCart([...cart, { ...product, quantity: 1, total: product.price }]);
  };

  const removeFromCart = (productId: string) => {
    setCart(
      cart.map((p) => {
        if (p.id === productId && p.quantity > 1) {
          return { ...p, quantity: p.quantity - 1, total: p.total - p.price };
        }
        return p;
      }),
    );
  };

  const removeMultipleProductsFromCart = (productId: string) => {
    setCart(cart.filter((p) => p.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, removeMultipleProductsFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
