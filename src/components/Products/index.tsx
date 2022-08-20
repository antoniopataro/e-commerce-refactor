import Product from "../Product";

import Link from "next/link";

import { useRouter } from "next/router";

import { ProductProps } from "../Product";

interface Props {
  showSidebar: boolean;
  category?: string;
  products: ProductProps[];
}

function Products({ showSidebar, category, products }: Props) {
  const router = useRouter();

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

  const handleFilteredProducts = () => {
    if (tags && category) {
      return products.filter((p) => {
        if (
          formattedTags?.every((t) => p.tags.join(" ").split(" ").includes(t)) &&
          p.categoryName === fromSlugToName(category)
        ) {
          return p;
        }
        return;
      });
    }

    if (tags) {
      return products.filter((p) => {
        if (formattedTags?.every((t) => p.tags.join(" ").split(" ").includes(t))) {
          return p;
        }
        return;
      });
    }

    if (category) {
      return products.filter((p) => {
        if (p.categoryName === fromSlugToName(category)) {
          return p;
        }
        return;
      });
    }

    return products;
  };

  const filteredProducts = handleFilteredProducts();

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
            <Link href={`/${category}`}>
              <a className="text-gray-700 transition-colors hover:text-violet-700">{fromSlugToName(category)}</a>
            </Link>
          </>
        )}
      </nav>
      <h1 className="px-8 pt-8 font-black text-2xl text-gray-700">
        {router.query.category ? fromSlugToName(router.query.category as string) : "Main Page"}
      </h1>
      <div className="flex items-center gap-4 p-8">
        {formattedTags ? (
          formattedTags?.map((tag, index) => (
            <span key={index} className="px-4 py-2 rounded-xl bg-gray-100 text-xs text-gray-500">
              {fromSlugToName(tag)}
            </span>
          ))
        ) : (
          <span className="px-4 py-2 rounded-xl bg-gray-100 text-xs text-gray-500">No Tags</span>
        )}
      </div>
      <ul className="flex flex-wrap p-8 gap-8 overflow-scroll">
        {filteredProducts?.length > 0 ? (
          filteredProducts.map((product) => <Product key={product.id} showSidebar={showSidebar} product={product} />)
        ) : (
          <span className="w-full text-center text-gray-700">There are no items matching your filters.</span>
        )}
      </ul>
    </main>
  );
}

export default Products;
