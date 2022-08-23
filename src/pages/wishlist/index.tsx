import React, { useContext } from "react";

import Header from "@components/Header";

import { WishlistContext } from "@contexts/WishlistProvider";
import { CartContext } from "@contexts/CartProvider";

import { useRouter } from "next/router";

import axios from "axios";

import { ProductProps } from "@components/Product";

interface Props {
  products: ProductProps[];
}

function Wishlist({ products }: Props) {
  const router = useRouter();

  const { addToCart } = useContext(CartContext);
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  const handlePrice = (price: number) => {
    return price.toFixed(2);
  };

  return (
    <main className="flex flex-col w-screen h-full items-center font-medium text-sm text-text">
      <Header products={products} />
      <main className="flex flex-col w-2/3 h-full gap-8 py-8">
        <header className="flex">
          <h1 className="w-full text-left font-black text-2xl text-gray-700">Wishlist</h1>
        </header>
        <ul className="grid h-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-start gap-8 overflow-scroll">
          {wishlist.length > 0 ? (
            wishlist.map((product) => (
              <li
                key={product.id}
                onClick={() => router.push(`/product/${product.id}`)}
                className={`relative flex flex-col w-full h-fit justify-between overflow-hidden rounded-2xl border-[1px] border-gray-300 bg-gray-100 cursor-pointer transition-colors hover:bg-gray-200`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWishlist(product.id);
                  }}
                  className="group absolute right-4 top-4 p-2"
                >
                  <span className="text-xl">&times;</span>
                </button>
                <div className="flex h-full items-center justify-center">
                  <span className="flex items-center justify-center scale-50">
                    <img src={product.imageUrl} alt={product.name} title={product.name} />
                  </span>
                </div>
                <div className="flex flex-col w-full justify-between gap-4 p-4 border-t-[1px] border-gray-300 bg-white">
                  <span className="text-base font-semibold">{product.name}</span>
                  <div className="flex md:flex-col lg:flex-row items-end justify-between gap-2">
                    <span className="text-base font-semibold">${handlePrice(product.price)}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="group p-4 rounded-2xl bg-violet-700 text-white transition-colors hover:bg-violet-800"
                    >
                      <svg
                        className="w-5 h-5 fill-gray-300 transition-colors group-hover:fill-white"
                        width="27"
                        height="24"
                        viewBox="0 0 27 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M25.1382 16.878H8.27349L9.12026 15.1533L23.1898 15.1278C23.6656 15.1278 24.0734 14.788 24.1583 14.3179L26.1068 3.41172C26.1578 3.12568 26.0813 2.83115 25.8944 2.60742C25.802 2.49731 25.6868 2.40862 25.5567 2.34749C25.4266 2.28636 25.2848 2.25426 25.1411 2.25342L7.24263 2.19395L7.0897 1.47461C6.99341 1.01582 6.57993 0.681641 6.10981 0.681641H1.73433C1.46919 0.681641 1.21491 0.786966 1.02743 0.974448C0.839945 1.16193 0.734619 1.41621 0.734619 1.68135C0.734619 1.94649 0.839945 2.20077 1.02743 2.38825C1.21491 2.57573 1.46919 2.68105 1.73433 2.68105H5.29985L5.96821 5.85859L7.61362 13.8251L5.49526 17.283C5.38525 17.4315 5.31899 17.6078 5.30398 17.792C5.28896 17.9761 5.32579 18.1609 5.4103 18.3252C5.58022 18.6622 5.9229 18.8746 6.30239 18.8746H8.08091C7.70175 19.3782 7.49695 19.9916 7.49751 20.622C7.49751 22.2249 8.80024 23.5276 10.4032 23.5276C12.0061 23.5276 13.3088 22.2249 13.3088 20.622C13.3088 19.9904 13.0993 19.3759 12.7254 18.8746H17.2878C16.9087 19.3782 16.7039 19.9916 16.7044 20.622C16.7044 22.2249 18.0072 23.5276 19.6101 23.5276C21.213 23.5276 22.5158 22.2249 22.5158 20.622C22.5158 19.9904 22.3062 19.3759 21.9324 18.8746H25.1411C25.6905 18.8746 26.1408 18.4271 26.1408 17.8749C26.1391 17.61 26.0328 17.3566 25.845 17.1698C25.6572 16.9831 25.4031 16.8782 25.1382 16.878V16.878ZM7.65894 4.16504L23.9658 4.21885L22.3685 13.1624L9.55923 13.1851L7.65894 4.16504ZM10.4032 21.5169C9.9104 21.5169 9.50825 21.1147 9.50825 20.622C9.50825 20.1292 9.9104 19.727 10.4032 19.727C10.8959 19.727 11.2981 20.1292 11.2981 20.622C11.2981 20.8593 11.2038 21.0869 11.036 21.2548C10.8681 21.4226 10.6405 21.5169 10.4032 21.5169V21.5169ZM19.6101 21.5169C19.1173 21.5169 18.7152 21.1147 18.7152 20.622C18.7152 20.1292 19.1173 19.727 19.6101 19.727C20.1029 19.727 20.505 20.1292 20.505 20.622C20.505 20.8593 20.4107 21.0869 20.2429 21.2548C20.0751 21.4226 19.8475 21.5169 19.6101 21.5169V21.5169Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <span className="absolute flex justify-center">
              There are no items in your wishlist.&nbsp;
              <button
                onClick={() => router.push("/")}
                className="underline text-violet-700 transition-colors hover:text-violet-900"
              >
                Go shopping.
              </button>
            </span>
          )}
        </ul>
      </main>
    </main>
  );
}

export async function getServerSideProps() {
  const products = await axios.get("http://localhost:3000/api/products");

  return {
    props: {
      products: products.data,
    },
  };
}

export default Wishlist;
