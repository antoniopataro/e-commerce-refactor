import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import axios from "axios";

import { ProductProps } from "@components/Product";

function Products() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await axios.get("http://localhost:3000/api/products");
      setProducts(products.data);
    };

    fetchProducts();
  }, []);

  const handlePrice = (price: number) => {
    return price.toFixed(2);
  };

  return (
    <main className="flex flex-col w-full min-h-screen items-center gap-16 p-16">
      <header className="flex flex-col w-1/3 gap-8">
        <span className="text-gray-500 text-sm text-center font-bold">E-Commerce</span>
        <div className="flex gap-2 text-2xl font-semibold text-gray-700">
          <button onClick={() => router.push("/admin")}>&lt;-</button>
          <span>Products</span>
        </div>
      </header>
      <main className="flex flex-col w-1/2 items-center gap-16 text-sm font-medium">
        <div className="flex w-full items-center gap-4 px-6 py-4 rounded-2xl bg-gray-100 ">
          <span>
            <svg
              className="fill-gray-500"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.9908 11.7301L12.7215 12.0783L13.0328 12.3896L19.1979 18.5547L18.5501 19.2011L12.3844 13.0377L12.0736 12.727L11.7255 12.9955C10.5341 13.9148 9.08004 14.4137 7.54503 14.4137C5.70839 14.4137 3.98688 13.7003 2.69108 12.4022L2.69077 12.4019C1.39463 11.1057 0.678955 9.38151 0.678955 7.54762C0.678955 5.71098 1.39237 3.98947 2.69046 2.69367L2.69077 2.69336C3.9869 1.39723 5.71114 0.681549 7.54503 0.681549C9.3793 0.681549 11.1032 1.39503 12.399 2.69305C13.6957 3.99202 14.4111 5.71162 14.4111 7.54762C14.4111 9.08277 13.9121 10.5391 12.9908 11.7301ZM19.4094 18.7662C19.4094 18.7662 19.4094 18.7662 19.4093 18.7661L19.6204 18.555L19.6205 18.555L19.6205 18.555L19.6205 18.5549L19.6206 18.555L19.4094 18.7662ZM19.6207 18.5549L19.6206 18.5548L19.7629 18.4126L19.6207 18.5549ZM18.3392 19.4115C18.3393 19.4114 18.3394 19.4113 18.3395 19.4112L18.3392 19.4115ZM11.7874 11.7909L11.7879 11.7905C12.9203 10.658 13.545 9.14844 13.545 7.54762C13.545 5.94646 12.9201 4.43968 11.7883 3.3052C10.6553 2.16954 9.14534 1.54762 7.54503 1.54762C5.94387 1.54762 4.43709 2.17256 3.30261 3.30436L3.30219 3.30478C2.16974 4.43723 1.54503 5.9468 1.54503 7.54762C1.54503 9.14878 2.16996 10.6556 3.30177 11.79L3.30261 11.7909C4.43709 12.9227 5.94387 13.5476 7.54503 13.5476C9.14619 13.5476 10.653 12.9227 11.7874 11.7909Z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search among our products..."
            className="outline-none border-none bg-transparent placeholder:text-gray-300 font-normal"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <ul className="flex flex-col w-full">
          {products
            .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
            .map((product) => (
              <li
                key={product.id}
                className="flex flex-col w-full items-center justify-between gap-4 py-4 border-gray-300 border-b-[1px] overflow-hidden"
              >
                <div className="flex w-full">
                  <div className="flex w-full items-center gap-2">
                    <span className="flex w-12 h-12 items-center justify-center p-1 rounded bg-gray-300">
                      <img src={product.imageUrl} alt="" />
                    </span>
                    <span>{product.name}</span>
                    <span className="px-2 py-1 rounded text-gray-500 bg-gray-300 text-xs">{product.categoryName}</span>
                  </div>
                  <div className="flex w-1/2 items-center justify-end gap-2">
                    <span>${handlePrice(product.price)}</span>
                  </div>
                </div>
                <p>{product.description}</p>
                <ul className="flex flex-wrap w-full justify-center gap-2">
                  {product.tags.map((tag, index) => (
                    <li key={index} className="flex px-2 py-1 rounded text-gray-500 bg-gray-300 text-xs">
                      {tag}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
        </ul>
      </main>
    </main>
  );
}

export default Products;
