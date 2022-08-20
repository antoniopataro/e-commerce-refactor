import { useEffect } from "react";

import Header from "../components/Header";
import Products from "../components/Products";
import Sidebar, { Category } from "../components/Sidebar";

import { useRouter } from "next/router";

import axios from "axios";

import { ProductProps } from "../components/Product";

interface Props {
  products: ProductProps[];
  categories: Category[];
}

function Home({ products, categories }: Props) {
  const router = useRouter();
  const category = router.query.category;

  const fromSlugToName = (slug: string) => {
    return slug
      .split("-")
      .map((s) => {
        return s.charAt(0).toUpperCase() + s.slice(1);
      })
      .join(" ");
  };

  useEffect(() => {
    if (!categories.map((c) => c.name).includes(fromSlugToName(category as string))) {
      router.push("/");
      return;
    }
  }, [category, categories, router]);

  return (
    <main className="flex flex-col w-screen h-screen font-medium text-sm text-text">
      <Header products={products} />
      <main className="flex w-full h-full">
        <Sidebar categories={categories} />
        <Products category={category as string} products={products} />
      </main>
    </main>
  );
}

export async function getServerSideProps() {
  const products = await axios.get("http://localhost:3000/api/products");
  const categories = await axios.get("http://localhost:3000/api/categories");

  return {
    props: {
      products: products.data,
      categories: categories.data,
    },
  };
}

export default Home;
