import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CategorySearch from "./CategorySearch";
import CategorySidebar from "./CategorySidebar";
import CategoryGrid from "./CategoryGrid";
import Pagination from "./Pagination";
import useTitle from "../../hooks/useTitle";

const Categories = () => {
    useTitle("Categories");
  const axiosSecure = useAxiosSecure();

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 9;

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],

    queryFn: async () => {
      const res = await axiosSecure.get("/categories");

      return res.data;
    },
  });

  const filteredCategories = categories.filter((category) => {
    const matchesCategory =
      selectedCategory === "All" || category.name === selectedCategory;

    const matchesSearch = category.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(
  filteredCategories.length / itemsPerPage
);

const paginatedCategories =
  filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="hero bg-base-200 rounded-3xl mb-10">
        <div className="hero-content text-center py-2">
          <div>
            <h1 className="text-5xl font-bold">Browse Categories</h1>

            <p className="py-4 text-base-content/70">
              Discover products across all categories
            </p>

            <CategorySearch
  search={search}
  setSearch={(value) => {
    setSearch(value);
    setCurrentPage(1);
  }}
/>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <CategorySidebar
            categories={categories}
            isLoading={isLoading}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            setCurrentPage={setCurrentPage}
          />
        </div>

        <div className="lg:col-span-3">
          <CategoryGrid
  categories={paginatedCategories}
  isLoading={isLoading}
/>
<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  setCurrentPage={setCurrentPage}
/>
        </div>
      </div>
    </div>
  );
};

export default Categories;
