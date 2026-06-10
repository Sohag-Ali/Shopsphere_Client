import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CategoryCard from "../../coponents/Card/CategoryCard";

const Categories = () => {
  const axiosSecure = useAxiosSecure();

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [search, setSearch] = useState("");

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/categories");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const filteredCategories = categories.filter((category) => {
    const matchesCategory =
      selectedCategory === "All" ||
      category.name === selectedCategory;

    const matchesSearch = category.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      
      {/* Hero Section */}
      <div className="hero bg-base-200 rounded-3xl mb-10">
        <div className="hero-content text-center py-16">
          <div>
            <h1 className="text-5xl font-bold">
              Browse Categories
            </h1>

            <p className="py-4 text-gray-500">
              Discover products across all categories
            </p>

            {/* Search Bar */}
            <div className="mt-6 flex justify-center">
              <input
                type="text"
                placeholder="Search categories..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="
                  input
                  input-bordered
                  w-full
                  max-w-md
                  rounded-full
                "
              />
            </div>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-base-100 shadow rounded-2xl p-5 sticky top-24">

            <h2 className="font-bold text-xl mb-4">
              Categories
            </h2>

            <button
              onClick={() =>
                setSelectedCategory("All")
              }
              className={`w-full text-left px-4 py-2 rounded-lg mb-2 transition ${
                selectedCategory === "All"
                  ? "bg-primary text-white"
                  : "hover:bg-base-200"
              }`}
            >
              All Categories
            </button>

            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() =>
                  setSelectedCategory(category.name)
                }
                className={`w-full text-left px-4 py-2 rounded-lg mb-2 transition ${
                  selectedCategory === category.name
                    ? "bg-primary text-white"
                    : "hover:bg-base-200"
                }`}
              >
                {category.name}

                <span className="float-right">
                  ({category.productCount})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="lg:col-span-3">

          {filteredCategories.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-xl text-gray-500">
                No Category Found
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

              {filteredCategories.map((category) => (
                <CategoryCard
                  key={category._id}
                  category={category}
                />
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Categories;