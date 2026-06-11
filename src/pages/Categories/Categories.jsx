import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../hooks/useAxiosSecure";

import CategoryCard from "../../coponents/Card/CategoryCard";
import CategoryCardSkeleton from "../../coponents/Skeleton/CategoryCardSkeleton";


const Categories = () => {

  const axiosSecure = useAxiosSecure();

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [search, setSearch] =
    useState("");

  const {
    data: categories = [],
    isLoading,
  } = useQuery({

    queryKey: ["categories"],

    queryFn: async () => {

      const res =
        await axiosSecure.get(
          "/categories"
        );

      return res.data;

    },

  });

  const filteredCategories =
    categories.filter(
      (category) => {

        const matchesCategory =
          selectedCategory === "All" ||
          category.name ===
            selectedCategory;

        const matchesSearch =
          category.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        return (
          matchesCategory &&
          matchesSearch
        );

      }
    );

  return (

    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Hero */}

      <div className="hero bg-base-200 rounded-3xl mb-10">

        <div className="hero-content text-center py-2">

          <div>

            <h1 className="text-5xl font-bold">
              Browse Categories
            </h1>

            <p className="py-4 text-base-content/70">
              Discover products across all categories
            </p>

          <div className="mt-3 flex justify-center">

  <div
    className="
      flex
      items-center
      bg-base-100
      rounded-2xl
      shadow-lg
      border
      border-base-300
      overflow-hidden

      hover:shadow-xl
      focus-within:border-primary

      transition-all
      duration-300

      w-full
      max-w-2xl
    "
  >

    <div
      className="
        px-5
        text-xl
        text-primary
      "
    >
      🔍
    </div>

    <input
      type="text"
      placeholder="Search categories..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
      className="
        flex-1
        h-10
        bg-transparent
        border-none
        outline-none

        text-base-content
        placeholder:text-base-content/50
      "
    />

    {search && (

      <button
        onClick={() =>
          setSearch("")
        }
        className="
          px-3
          text-lg
          text-base-content/50
          hover:text-error
        "
      >
        ✕
      </button>

    )}

    <button
      className="
        h-8
        mr-2
        px-6

        rounded-xl

        bg-primary
        text-primary-content

        hover:scale-105
        hover:shadow-lg

        transition-all
        duration-300
      "
    >
      Search
    </button>

  </div>

</div>
          </div>

        </div>

      </div>

      {/* Layout */}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Sidebar */}

        <div className="lg:col-span-1">

          <div
            className="
              bg-base-100
              shadow-lg
              rounded-2xl
              p-5
              sticky
              top-24
            "
          >

            <h2
              className="
                font-bold
                text-xl
                mb-4
              "
            >
              Categories
            </h2>

            <button
              onClick={() =>
                setSelectedCategory(
                  "All"
                )
              }
              className={`
                w-full
                text-left
                px-4
                py-2
                rounded-lg
                mb-2
                transition

                ${
                  selectedCategory ===
                  "All"
                    ? "bg-primary text-primary-content"
                    : "hover:bg-base-200"
                }
              `}
            >
              All Categories
            </button>

            {isLoading
              ? [...Array(6)].map(
                  (_, index) => (

                    <div
                      key={index}
                      className="
                        skeleton
                        h-10
                        w-full
                        mb-2
                      "
                    ></div>

                  )
                )
              : categories.map(
                  (category) => (

                    <button
                      key={
                        category._id
                      }
                      onClick={() =>
                        setSelectedCategory(
                          category.name
                        )
                      }
                      className={`
                        w-full
                        text-left
                        px-4
                        py-2
                        rounded-lg
                        mb-2
                        transition

                        ${
                          selectedCategory ===
                          category.name
                            ? "bg-primary text-primary-content"
                            : "hover:bg-base-200"
                        }
                      `}
                    >

                      {category.name}

                      <span className="float-right">

                        (
                        {
                          category.productCount
                        }
                        )

                      </span>

                    </button>

                  )
                )}

          </div>

        </div>

        {/* Categories Grid */}

        <div className="lg:col-span-3">

          {isLoading ? (

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-8
              "
            >

              {[...Array(6)].map(
                (_, index) => (

                  <CategoryCardSkeleton
                    key={index}
                  />

                )
              )}

            </div>

          ) : filteredCategories.length === 0 ? (

            <div
              className="
                flex
                justify-center
                items-center
                h-64
              "
            >

              <p
                className="
                  text-xl
                  text-base-content/60
                "
              >
                No Category Found
              </p>

            </div>

          ) : (

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-8
              "
            >

              {filteredCategories.map(
                (category) => (

                  <CategoryCard
                    key={
                      category._id
                    }
                    category={
                      category
                    }
                  />

                )
              )}

            </div>

          )}

        </div>

      </div>

    </div>

  );

};

export default Categories;