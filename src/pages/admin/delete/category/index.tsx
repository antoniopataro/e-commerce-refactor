import React, { useRef } from "react";

import { useRouter } from "next/router";

import axios from "axios";

interface Props {
  categories: {
    name: string;
  }[];
}

function DeleteCategory({ categories }: Props) {
  const router = useRouter();

  const categoryNameRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const categoryName = categoryNameRef.current?.value;

    if (!categoryName) return;

    const response = await axios.delete(`http://localhost:3000/api/delete/categories/${categoryName}`);

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
        <h1 className="font-semibold text-2xl text-left">Delete Category</h1>
      </header>
      <form className="flex flex-col w-1/3 gap-4 text-sm font-medium" noValidate onSubmit={handleSubmit}>
        <div className="flex w-full gap-4">
          <select
            ref={categoryNameRef}
            id="category"
            className="w-full px-4 py-2 outline-none ring-1 ring-gray-300 rounded text-black transition-all focus:ring-violet-700 font-normal"
            defaultValue="Pick a category..."
          >
            <option hidden defaultValue="Pick a category...">
              Pick a category...
            </option>
            {categories.map((category) => (
              <option key={category.name} defaultValue={category.name}>
                {category.name}
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
  const response = await axios.get("http://localhost:3000/api/categories");

  return {
    props: {
      categories: response.data,
    },
  };
}

export default DeleteCategory;
