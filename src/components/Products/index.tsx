import React, { useState } from "react";

import Product from "@components/Product";

import Link from "next/link";

import { useRouter } from "next/router";

import { Category } from "@components/Sidebar";
import { ProductProps } from "@components/Product";

interface Props {
  showSidebar: boolean;
  category?: Category;
  products: ProductProps[];
}

function Products({ showSidebar, category, products }: Props) {
  const router = useRouter();

  const [filterByPrice, setFilterByPrice] = useState("");

  const fromSlugToName = (slug: string) => {
    return slug
      .split("-")
      .map((s) => {
        return s.charAt(0).toUpperCase() + s.slice(1);
      })
      .join(" ");
  };

  const tags = router.query.tags;

  const formatTags = () => {
    if (typeof tags === "string") {
      return Array(tags);
    }
    return tags;
  };

  const formattedTags = formatTags();

  const productsFilteredByPrice = () => {
    if (filterByPrice === "low") {
      return products.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        }
        return 0;
      });
    }

    if (filterByPrice === "high") {
      return products.sort((a, b) => {
        if (a.price > b.price) {
          return -1;
        }
        return 0;
      });
    }

    return products;
  };

  const filteredProducts = productsFilteredByPrice();

  const page = Number(router.query.page) || 1;

  return (
    <main className="flex flex-col w-full h-full">
      <nav className="group flex gap-4 px-8 pt-8 text-gray-500">
        <Link href="/">
          <a className={`${category ? "text-gray-500" : "text-gray-700"} transition-colors hover:text-violet-700`}>
            Main Page
          </a>
        </Link>
        {category && (
          <>
            -&gt;
            <Link href={`/${category.slug}`}>
              <a className="text-gray-700 transition-colors hover:text-violet-700">{category.name}</a>
            </Link>
          </>
        )}
      </nav>
      <h1 className="px-8 pt-8 font-black text-2xl text-gray-700">{category ? category.name : "Main Page"}</h1>
      <div className="flex w-full items-center justify-between gap-4 p-8">
        <div className="flex items-center gap-4">
          {formattedTags ? (
            <>
              {formattedTags?.map((tag, index) => (
                <span key={index} className="px-4 py-2 rounded-xl bg-gray-100 text-xs text-gray-500">
                  {fromSlugToName(tag)}
                </span>
              ))}
              {tags && (
                <button
                  onClick={() =>
                    router
                      .push({
                        pathname: category ? "/" + category.slug : "/",
                      })
                      .then(() => router.reload())
                  }
                >
                  &times;
                </button>
              )}
            </>
          ) : (
            <span className="px-4 py-2 rounded-xl bg-gray-100 text-xs text-gray-500">No Tags</span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <svg className="fill-gray-500" width="12" height="10" viewBox="0 0 12 10" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5217 0H0.477666C0.110132 0 -0.119389 0.372905 0.0651283 0.670391L3.55445 6.19274V9.55307C3.55445 9.80028 3.76747 10 4.03149 10H7.96785C8.23188 10 8.4449 9.80028 8.4449 9.55307V6.19274L11.9357 0.670391C12.1187 0.372905 11.8892 0 11.5217 0ZM7.3708 8.99441H4.62855V6.81564H7.3723V8.99441H7.3708ZM7.51481 5.68994L7.3723 5.92179H4.62705L4.48453 5.68994L1.50976 1.00559H10.4896L7.51481 5.68994Z" />
          </svg>
          <button
            onClick={filterByPrice === "low" ? () => setFilterByPrice("high") : () => setFilterByPrice("low")}
            className={`flex items-center gap-1 px-4 py-2 rounded-xl bg-gray-100 text-xs transition-all ${
              filterByPrice === "low" || filterByPrice === "high" ? "ring-1 ring-violet-700 text-violet-700" : ""
            }`}
          >
            <span>{filterByPrice === "low" ? "↓" : "↑"}</span>
            <span>Price</span>
          </button>
          <button onClick={() => setFilterByPrice("")}>&times;</button>
        </div>
      </div>
      <ul
        className={`relative grid h-full md:grid-cols-3 lg:grid-cols-4 ${
          showSidebar ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"
        } p-8 gap-8 overflow-scroll`}
      >
        {filteredProducts?.length > 0 ? (
          filteredProducts.map((product) => <Product key={product.id} showSidebar={showSidebar} product={product} />)
        ) : (
          <span className="absolute w-full text-center text-gray-700">There are no items matching your filters.</span>
        )}
      </ul>
      <div className="flex w-full items-center justify-center gap-4 px-8 py-16">
        {page > 1 && (
          <button
            onClick={() =>
              router.push({
                pathname: category ? "/" + category.slug : "/",
                query: {
                  page: page - 1,
                },
              })
            }
            className="w-12 h-12 rounded-xl text-gray-700"
          >
            {page - 1}
          </button>
        )}
        <button
          onClick={() =>
            router.push({
              pathname: category ? "/" + category.slug : "/",
              query: {
                page: page,
              },
            })
          }
          className="w-12 h-12 rounded-xl bg-violet-700 text-gray-100 transition-colors hover:bg-violet-900 hover:text-white"
        >
          {page}
        </button>
        {filteredProducts?.length >= 10 && (
          <button
            onClick={() =>
              router.push({
                pathname: category ? "/" + category.slug : "/",
                query: {
                  page: page + 1,
                },
              })
            }
            className="w-12 h-12 rounded-xl text-gray-700"
          >
            {page + 1}
          </button>
        )}
      </div>
    </main>
  );
}

export default Products;
