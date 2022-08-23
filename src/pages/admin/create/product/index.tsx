import React, { useRef } from "react";

import { useRouter } from "next/router";

import axios from "axios";

import { v4 as uuidv4 } from "uuid";

interface Props {
  categories: {
    name: string;
  }[];
}

function CreateProduct({ categories }: Props) {
  const router = useRouter();

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);
  const tagsRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const description = descriptionRef.current?.value;
    const price = priceRef.current?.value;
    const category = categoryRef.current?.value;
    const imageUrl = imageUrlRef.current?.value;
    const tags = tagsRef.current?.value;

    if (!name || !price || !category || !imageUrl || !description || !tags || category === "Pick a category...") return;

    const response = await axios.post("http://localhost:3000/api/create/product", {
      id: uuidv4(),
      name: name,
      description: description,
      price: Number(price),
      category: category,
      imageUrl: imageUrl,
      tags: JSON.stringify(tags.split(" ")),
    });

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
        <h1 className="font-semibold text-2xl text-left">New Product</h1>
      </header>
      <form className="flex flex-col w-1/3 gap-4 text-sm font-medium" noValidate onSubmit={handleSubmit}>
        <div className="flex flex-col w-full">
          <label htmlFor="name" className="pb-2">
            Name
          </label>
          <input
            ref={nameRef}
            autoComplete="off"
            type="text"
            id="name"
            className="w-full px-4 py-2 ring-1 ring-gray-300 outline-none rounded bg-transparent font-normal transition-all focus:ring-violet-700"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="description" className="flex items-end justify-between gap-2 pb-2">
            Description
            <span className="pt-2 text-xs text-gray-500">Maximum of 500 characters.</span>
          </label>
          <textarea
            ref={descriptionRef}
            maxLength={500}
            autoComplete="off"
            id="description"
            className="resize-none w-full px-4 py-2 ring-1 ring-gray-300 outline-none rounded bg-transparent font-normal transition-all focus:ring-violet-700"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="price" className="pb-2">
            Price
          </label>
          <input
            ref={priceRef}
            autoComplete="off"
            type="number"
            id="price"
            className="w-full px-4 py-2 ring-1 ring-gray-300 outline-none rounded bg-transparent font-normal transition-all focus:ring-violet-700"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="category" className="pb-2">
            Category
          </label>
          <div className="flex w-full gap-4">
            <select
              ref={categoryRef}
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
            <button
              type="button"
              onClick={() => router.push("/admin/create/category")}
              className="px-4 py-2 rounded bg-violet-100"
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="image" className="pb-2">
            Image URL
          </label>
          <input
            ref={imageUrlRef}
            autoComplete="off"
            type="text"
            id="image"
            className="w-full px-4 py-2 ring-1 ring-gray-300 outline-none rounded bg-transparent font-normal transition-all focus:ring-violet-700"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="tags" className="flex w-full items-end justify-between gap-2 pb-2">
            Tags
            <span className="pt-2 text-xs text-gray-500">Separate words with a single blank space.</span>
          </label>
          <input
            ref={tagsRef}
            autoComplete="off"
            type="text"
            id="tags"
            className="w-full px-4 py-2 ring-1 ring-gray-300 outline-none rounded bg-transparent font-normal transition-all focus:ring-violet-700"
          />
        </div>
        <div className="flex w-full justify-end gap-4 pt-4">
          <button type="button" onClick={() => router.push("/admin")} className="px-4 py-2 rounded bg-violet-100">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 rounded bg-violet-700 text-white">
            Add
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

export default CreateProduct;
