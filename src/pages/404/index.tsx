import { useState, useEffect } from "react";

import { useRouter } from "next/router";

function NotFound() {
  const router = useRouter();

  const [count, setCount] = useState(5);

  useEffect(() => {
    if (count > 0) {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
      return;
    }

    router.push("/");
  }, [count, router]);

  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center gap-4">
      <header className="flex flex-col items-center gap-4">
        <span onClick={() => router.push("/")} className="text-sm font-semibold text-gray-700">
          E-Commerce
        </span>
        <span className="text-6xl">⚠️</span>
      </header>
      <div className="flex flex-col font-medium text-sm">
        <p className="text-center">
          We could not find what you are looking for.
          <br />
          You will be redirected in {count}.
        </p>
      </div>
    </main>
  );
}

export default NotFound;
