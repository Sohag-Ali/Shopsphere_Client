const CategorySidebar = ({
  categories,
  isLoading,
  selectedCategory,
  setSelectedCategory,
   setCurrentPage
}) => {
  return (
    <div className="bg-base-100 shadow-lg rounded-2xl p-5 sticky top-24">

      <h2 className="font-bold text-xl mb-4">
        Categories
      </h2>

      <button
        onClick={() =>
           setSelectedCategory(categories.name),
          setCurrentPage(1)
        }
        className={`w-full text-left px-4 py-2 rounded-lg mb-2 transition ${
          selectedCategory === "All"
            ? "bg-primary text-primary-content"
            : "hover:bg-base-200"
        }`}
      >
        All Categories
      </button>

      {isLoading
        ? [...Array(6)].map(
            (_, index) => (
              <div
                key={index}
                className="skeleton h-10 w-full mb-2"
              />
            )
          )
        : categories.map(
            (category) => (
              <button
                key={category._id}
                onClick={() =>
                  setSelectedCategory(
                    category.name
                  )
                }
                className={`w-full text-left px-4 py-2 rounded-lg mb-2 transition ${
                  selectedCategory ===
                  category.name
                    ? "bg-primary text-primary-content"
                    : "hover:bg-base-200"
                }`}
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
  );
};

export default CategorySidebar;