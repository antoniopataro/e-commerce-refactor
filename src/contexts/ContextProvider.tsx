import UserProvider from "@contexts/UserProvider";
import CartProvider from "@contexts/CartProvider";
import WishlistProvider from "@contexts/WishlistProvider";

interface Props {
  children: React.ReactNode;
}

function ContextProvider({ children }: Props) {
  return (
    <UserProvider>
      <CartProvider>
        <WishlistProvider>{children}</WishlistProvider>
      </CartProvider>
    </UserProvider>
  );
}

export default ContextProvider;
