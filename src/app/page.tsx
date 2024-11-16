"use client";

import { Product, ProductResponse } from "@/types/product";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<Product[]>([]);
  const [query, setQuery] = useState("");

  const getProducts = async () => {
    const response: ProductResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?query=${query}`
    ).then((res) => res.json());

    setData(response.products);
  };

  const debouncedSearchQuery = useDebounce(query, 300);

  useEffect(() => {
    getProducts();
  }, [debouncedSearchQuery]);

  return (
    <div className="flex justify-center">
      <div className="container p-5">
        <div>
          <input
            type="text"
            name="first-name"
            id="first-name"
            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset "
            placeholder="Search Product here..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
          {data.map((product, i) => (
            <div className="group relative" key={i}>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700 font-bold">
                    <a href="#">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0"
                      ></span>
                      {product.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.description}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
