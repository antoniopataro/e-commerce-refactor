import React, { useState } from "react";

import Header from "@components/Header";
import Products from "@components/Products";
import Sidebar, { Category } from "@components/Sidebar";

import { ProductProps } from "@components/Product";

import { NextPageContext } from "next";

import axios from "axios";

interface Props {
  products: ProductProps[];
  categories: Category[];
}

function Home({ products, categories }: Props) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <main className="flex flex-col w-screen min-h-screen h-full font-medium text-sm text-text">
      <Header setShowSidebar={setShowSidebar} products={products} />
      <main className="flex w-full h-full">
        <Sidebar showSidebar={showSidebar} categories={categories} />
        <Products showSidebar={showSidebar} products={products} />
      </main>
    </main>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { page, tags } = context.query;

  const products = await axios.get("http://localhost:3000/api/products", {
    params: {
      take: 10,
      skip: 10 * (Number(page) - 1),
      tags: JSON.stringify(tags),
    },
  });
  const categories = await axios.get("http://localhost:3000/api/categories");

  return {
    props: {
      products: products.data,
      categories: categories.data,
    },
  };
}

export default Home;
