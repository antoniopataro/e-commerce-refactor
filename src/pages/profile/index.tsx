import React, { useEffect, useContext } from "react";

import Header from "@components/Header";

import { UserContext } from "@contexts/UserProvider";

import { useRouter } from "next/router";

import axios from "axios";

import { ProductProps } from "@components/Product";

interface Props {
  products: ProductProps[];
}

function Profile({ products }: Props) {
  const router = useRouter();

  const { user, logOut } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
  }, [router, user]);

  return (
    <main className="flex flex-col w-screen h-screen items-center font-medium text-sm text-text">
      <Header products={products} />
      <main className="flex w-full h-full justify-center">
        <section className="flex flex-col w-1/3 h-fit gap-8 py-8 pr-8">
          <header className="flex w-full justify-between">
            <div className="flex flex-col w-fit justify-between">
              <div>
                <h1 className="w-full text-left font-black text-2xl text-gray-700">{user?.name}</h1>
                <span>{user?.email}</span>
              </div>
              <button
                onClick={logOut}
                className="w-fit p-4 rounded-xl bg-violet-700 text-gray-100 transition-colors hover:bg-violet-900 hover:text-white"
              >
                Log Out
              </button>
            </div>
            <img src={user?.imageUrl} alt={user?.name} width={150} className="rounded-full" />
          </header>
        </section>
        <aside className="flex flex-col w-1/3 h-full gap-8 py-8 pl-8 border-l-[1px] border-gray-300">
          <header className="flex w-2/3">
            <h1 className="w-full text-left font-black text-2xl text-gray-700">Your Purchases</h1>
          </header>
          <ul>
            {user?.purchases && user.purchases.length > 1 ? (
              user.purchases.map((purchase) => (
                <li key={purchase.id}>
                  <p>{purchase.items.map((item) => item.name).join(", ")}</p>
                  <p>{purchase.purchasedAt.toLocaleDateString()}</p>
                  <p>${purchase.total}</p>
                </li>
              ))
            ) : (
              <span>You havent purchased anything yet.</span>
            )}
          </ul>
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

export default Profile;
