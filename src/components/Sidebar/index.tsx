import { useState, useEffect } from "react";

import Checkbox from "../Checkbox";

import Link from "next/link";

import { useRouter } from "next/router";

import { ProductProps } from "../Product";

export interface Category {
  name: string;
  products: ProductProps[];
}

interface Props {
  showSidebar: boolean;
  categories: Category[];
}

function Sidebar({ showSidebar, categories }: Props) {
  const router = useRouter();

  const handleSlugBasedOnCategoryName = (categoryName: string) => {
    return categoryName.toLowerCase().replace(/ /g, "-");
  };

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

  return (
    <aside
      className={`${
        showSidebar ? "" : "hidden"
      } lg:flex flex-col w-full md:w-1/3 border-r-[1px] border-gray-300 overflow-hidden`}
    >
      <nav className="flex flex-col gap-4 mx-16 py-16 border-b-[1px] border-gray-300 overflow-hidden">
        <span className="text-base font-semibold">Category</span>
        {categories.map((category) => (
          <Link href={`/${handleSlugBasedOnCategoryName(category.name)}`} key={category.name}>
            <a className="w-fit pl-4 text-gray-300 transition-colors hover:text-violet-700">{category.name}</a>
          </Link>
        ))}
      </nav>
      <menu className="flex flex-col gap-4 mx-16 py-16 border-b-[1px] border-gray-300 overflow-hidden">
        <span className="text-base font-semibold">Tags</span>
        <Checkbox label="Men" tags={tags} setTags={setTags} />
        <Checkbox label="Woman" tags={tags} setTags={setTags} />
        <Checkbox label="Blue" tags={tags} setTags={setTags} />
        <Checkbox label="Green" tags={tags} setTags={setTags} />
        <Checkbox label="Red" tags={tags} setTags={setTags} />
        <Checkbox label="Pink" tags={tags} setTags={setTags} />
      </menu>
    </aside>
  );
}

export default Sidebar;
