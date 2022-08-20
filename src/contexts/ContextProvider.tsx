import UserProvider from "./UserProvider";
import CartProvider from "./CartProvider";
import WishlistProvider from "./WishlistProvider";

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
