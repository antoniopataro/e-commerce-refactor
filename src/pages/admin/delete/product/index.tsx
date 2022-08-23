import React, { useRef } from "react";

import { useRouter } from "next/router";

import { ProductProps } from "@components/Product";

import axios from "axios";

interface Props {
  products: ProductProps[];
}

function DeleteProduct({ products }: Props) {
  const router = useRouter();

  const productNameRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productName = productNameRef.current?.value;
    const product = products.find((product) => product.name === productName);

    if (!product) return;

    const response = await axios.delete(`http://localhost:3000/api/delete/products/${product.id}`);

    if (response.status === 200) {
      router.reload();
      return;
    }
  };

  return (
    <main className="flex flex-col w-screen min-h-screen items-center gap-8 p-16">
      <span className="text-sm font-semibold text-gray-500">E-Commerce</span>
      <header className="flex w-1/3 gap-4 text-gray-700">
        <button onClick={() => router.push("/admin")} className="font-semibold text-2xl text-left">
          &lt;-
        </button>
        <h1 className="font-semibold text-2xl text-left">Delete Product</h1>
      </header>
      <form className="flex flex-col w-1/3 gap-4 text-sm font-medium" noValidate onSubmit={handleSubmit}>
        <div className="flex w-full gap-4">
          <select
            ref={productNameRef}
            id="product"
            className="w-full px-4 py-2 outline-none ring-1 ring-gray-300 rounded text-black transition-all focus:ring-violet-700 font-normal"
            defaultValue="Pick a product..."
          >
            <option hidden defaultValue="Pick a product...">
              Pick a product...
            </option>
            {products.map((product) => (
              <option key={product.name} defaultValue={product.name}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-full justify-end gap-4 pt-4">
          <button type="button" onClick={() => router.push("/admin")} className="px-4 py-2 rounded bg-violet-100">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 rounded bg-violet-700 text-white">
            Delete
          </button>
        </div>
      </form>
    </main>
  );
}

export async function getServerSideProps() {
  const response = await axios.get("http://localhost:3000/api/products");

  return {
    props: {
      products: response.data,
    },
  };
}

export default DeleteProduct;
