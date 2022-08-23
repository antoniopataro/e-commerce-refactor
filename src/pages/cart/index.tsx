import React, { useContext, useRef, useState } from "react";

import Header from "@components/Header";

import { CartContext, CartProps } from "@contexts/CartProvider";
import { UserContext } from "@contexts/UserProvider";

import { useRouter } from "next/router";

import axios from "axios";

import { ProductProps } from "@components/Product";

interface Props {
  products: ProductProps[];
}

function Cart({ products }: Props) {
  const router = useRouter();

  const { isAuthenticated } = useContext(UserContext);
  const { cart, addToCart, removeFromCart, removeMultipleProductsFromCart } = useContext(CartContext);

  const handlePrice = (price: number) => {
    return price.toFixed(2);
  };

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const [cartError, setCartError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const validateInputs = (
    firstName?: string,
    lastName?: string,
    country?: string,
    address?: string,
    products?: CartProps[],
  ) => {
    if (products?.length === 0) {
      return "ERROR: There are no products in cart";
    }

    if (!firstName || firstName.split(" ").length > 1) {
      return "ERROR: You must enter a single first name";
    }

    if (!lastName || lastName.split(" ").length > 1) {
      return "ERROR: You must enter a single last name";
    }

    if (!country) {
      return "ERROR: You must enter a country";
    }

    if (!address) {
      return "ERROR: You must enter a address";
    }

    return { user: { firstName, lastName, country, address }, products };
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) return router.push("/login");

    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const country = countryRef.current?.value;
    const address = addressRef.current?.value;
    const products = cart;

    const response = validateInputs(firstName, lastName, country, address, products);

    response === "ERROR: There are no products in cart" ? setCartError(true) : setCartError(false);
    response === "ERROR: You must enter a single first name" ? setFirstNameError(true) : setFirstNameError(false);
    response === "ERROR: You must enter a single last name" ? setLastNameError(true) : setLastNameError(false);
    response === "ERROR: You must enter a country" ? setCountryError(true) : setCountryError(false);
    response === "ERROR: You must enter a address" ? setAddressError(true) : setAddressError(false);

    if (typeof response === "string") return;

    console.log(response);
  };

  const total = cart.reduce((acc, curr) => acc + curr.total, 0);
  const formattedTotal = handlePrice(total);

  return (
    <main className="flex flex-col w-screen h-screen items-center font-medium text-sm text-text">
      <Header products={products} />
      <main className="flex w-full h-full justify-center">
        <section className="flex flex-col w-1/3 h-fit gap-8 py-8 pr-8">
          <header className="flex w-2/3">
            <h1 className="w-full text-left font-black text-2xl text-gray-700">Information</h1>
          </header>
          <form
            id="information"
            className="flex flex-col w-full gap-4 text-sm font-medium"
            noValidate
            onSubmit={handleCheckout}
          >
            <div className="flex gap-4">
              <div className="flex flex-col w-full">
                <label htmlFor="first-name" className={`pb-2 ${firstNameError ? "text-red-500" : ""}`}>
                  First Name
                </label>
                <input
                  ref={firstNameRef}
                  autoComplete="name"
                  type="text"
                  id="first-name"
                  className={`w-full px-4 py-2 ring-1 ${
                    firstNameError ? "ring-red-500" : "ring-gray-300"
                  } outline-none rounded bg-transparent font-normal transition-all focus:ring-violet-700`}
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="last-name" className={`pb-2 ${lastNameError ? "text-red-500" : ""}`}>
                  Last Name
                </label>
                <input
                  ref={lastNameRef}
                  autoComplete="name"
                  type="text"
                  id="last-name"
                  className={`w-full px-4 py-2 ring-1 ${
                    lastNameError ? "ring-red-500" : "ring-gray-300"
                  } outline-none rounded bg-transparent font-normal transition-all focus:ring-violet-700`}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col w-1/2">
                <label htmlFor="country" className={`pb-2 ${countryError ? "text-red-500" : ""}`}>
                  Country
                </label>
                <input
                  ref={countryRef}
                  autoComplete="country"
                  type="country"
                  id="country"
                  className={`w-full px-4 py-2 ring-1 ${
                    countryError ? "ring-red-500" : "ring-gray-300"
                  } outline-none rounded bg-transparent font-normal transition-all focus:ring-violet-700`}
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="address" className={`pb-2 ${addressError ? "text-red-500" : ""}`}>
                  Address
                </label>
                <input
                  ref={addressRef}
                  autoComplete="address"
                  type="address"
                  id="address"
                  className={`w-full px-4 py-2 ring-1 ${
                    addressError ? "ring-red-500" : "ring-gray-300"
                  } outline-none rounded bg-transparent font-normal transition-all focus:ring-violet-700`}
                />
              </div>
            </div>
          </form>
        </section>
        <aside className="flex flex-col w-1/3 h-full gap-8 py-8 pl-8 border-l-[1px] border-gray-300">
          <header className="flex w-2/3">
            <h1 className="w-full text-left font-black text-2xl text-gray-700">Your Cart</h1>
          </header>
          <ul className="flex flex-col gap-4">
            {cart.map((product, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-3 pb-6 border-gray-300 border-b-[1px] overflow-hidden"
              >
                <div className="flex w-full items-center gap-2">
                  <span className="flex w-12 h-12 items-center justify-center p-1 rounded bg-gray-300">
                    <img src={product.imageUrl} alt="" />
                  </span>
                  <span>{product.name}</span>
                </div>
                <div className="flex w-1/2 items-center justify-center gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex w-6 h-6 items-center justify-center rounded bg-gray-300"
                  >
                    +
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="flex w-6 h-6 items-center justify-center rounded bg-gray-300"
                  >
                    -
                  </button>
                </div>
                <div className="flex w-1/2 items-center justify-end gap-2">
                  <span>${handlePrice(product.price)}</span>
                  <button
                    onClick={() => removeMultipleProductsFromCart(product.id)}
                    className="flex w-6 h-6 items-center justify-center rounded bg-gray-300"
                  >
                    &times;
                  </button>
                </div>
              </li>
            ))}
            {cart.length === 0 && (
              <span className={`flex w-full justify-center ${cartError ? "text-red-500" : ""}`}>
                There are no items in your cart.&nbsp;
                <button
                  onClick={() => router.push("/")}
                  className="underline text-violet-700 transition-colors hover:text-violet-900"
                >
                  Go shopping.
                </button>
              </span>
            )}
          </ul>
          <div className="flex w-full justify-end">
            Total:&nbsp;<span className="font-bold">${formattedTotal}</span>
          </div>
          <div className="flex w-full justify-end gap-4 pt-4">
            <button
              onClick={() => router.push("/")}
              type="button"
              className="px-4 py-2 transition-colors hover:text-violet-700"
            >
              Continue Buying
            </button>
            <button form="information" type="submit" className="px-4 py-2 rounded bg-violet-700 text-white">
              Checkout
            </button>
          </div>
        </aside>
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

export default Cart;
