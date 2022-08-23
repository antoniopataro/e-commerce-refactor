import React, { useState, useEffect } from "react";

import Checkbox from "@components/Checkbox";

import { useRouter } from "next/router";

import { ProductProps } from "@components/Product";

export interface Category {
  name: string;
  products: ProductProps[];
  slug: string;
}

interface Props {
  showSidebar: boolean;
  categories: Category[];
}

function Sidebar({ showSidebar, categories }: Props) {
  const router = useRouter();

  const currentCategory = router.query.category;

  const [tags, setTags] = useState<string[]>((router.query.tags as string[]) || []);

  useEffect(() => {
    if (router.query.category) {
      router.push({
        pathname: "/" + router.query.category,
        query: {
          tags: tags,
        },
      });

      return;
    }

    router.push({
      pathname: "/",
      query: {
        tags: tags,
      },
    });
  }, [tags]);

  const sortedCategories = categories.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  return (
    <aside
      className={`${
        showSidebar ? "" : "hidden"
      } lg:flex flex-col w-full md:w-1/3 border-r-[1px] border-gray-300 overflow-hidden`}
    >
      <nav className="flex flex-col gap-4 mx-8 py-8 sm:mx-16 sm:py-16 border-b-[1px] border-gray-300 overflow-hidden">
        <span className="text-base font-semibold">Category</span>
        {sortedCategories.map((category) => (
          <a
            href={`/${category.slug}`}
            key={category.name}
            className={`w-fit pl-4 ${
              (currentCategory as string) === category.slug ? "text-violet-700" : "text-gray-300"
            } transition-colors hover:text-violet-700`}
          >
            {category.name}
          </a>
        ))}
      </nav>
      <menu className="flex flex-col gap-4 mx-8 py-8 sm:mx-12 sm:py-12 md:mx-16 md:py-16 border-b-[1px] border-gray-300 overflow-hidden">
        <span className="text-base font-semibold">Tags</span>
        <Checkbox label="Blue" tags={tags} setTags={setTags} />
        <Checkbox label="Green" tags={tags} setTags={setTags} />
        <Checkbox label="Men" tags={tags} setTags={setTags} />
        <Checkbox label="Pink" tags={tags} setTags={setTags} />
        <Checkbox label="Red" tags={tags} setTags={setTags} />
        <Checkbox label="Woman" tags={tags} setTags={setTags} />
      </menu>
    </aside>
  );
}

export default Sidebar;
