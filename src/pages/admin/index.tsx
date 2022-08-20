import { useRouter } from "next/router";

function Admin() {
  const router = useRouter();

  return (
    <main className="flex flex-col w-full h-screen items-center justify-center gap-16">
      <header className="flex flex-col w-1/3 gap-4">
        <span className="text-gray-500 text-sm text-center font-bold">E-Commerce</span>
        <div className="flex gap-2 text-2xl font-semibold text-gray-700">
          <button onClick={() => router.push("/")}>&lt;-</button>
          <span>Admin</span>
        </div>
      </header>
      <main className="flex flex-col items-center gap-16">
        <section className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">Products</span>
          <div className="flex gap-4">
            <button
              onClick={() => router.push("/admin/products")}
              className="px-4 py-2 bg-violet-100 rounded font-medium text-sm text-gray-500"
            >
              See All
            </button>
            <button
              onClick={() => router.push("/admin/create/product")}
              className="px-4 py-2 bg-violet-700 rounded font-medium text-sm text-gray-100"
            >
              Add
            </button>
            <button
              onClick={() => router.push("/admin/delete/product")}
              className="px-4 py-2 bg-violet-700 rounded font-medium text-sm text-gray-100"
            >
              Delete
            </button>
          </div>
        </section>
        <section className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">Categories</span>
          <div className="flex gap-4">
            <button
              onClick={() => router.push("/admin/categories")}
              className="px-4 py-2 bg-violet-100 rounded font-medium text-sm text-gray-500"
            >
              See All
            </button>
            <button
              onClick={() => router.push("/admin/create/category")}
              className="px-4 py-2 bg-violet-700 rounded font-medium text-sm text-gray-100"
            >
              Add
            </button>
            <button
              onClick={() => router.push("/admin/delete/category")}
              className="px-4 py-2 bg-violet-700 rounded font-medium text-sm text-gray-100"
            >
              Delete
            </button>
          </div>
        </section>
      </main>
    </main>
  );
}

export default Admin;
