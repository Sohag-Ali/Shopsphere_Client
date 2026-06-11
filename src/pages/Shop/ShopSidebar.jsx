const ShopSidebar = ({
  category,
  setCategory,
  sort,
  setSort,
}) => {

  return (
    <div
      className="
        bg-base-100
        rounded-2xl
        shadow-md
        p-5
        sticky
        top-24
      "
    >

      <h3 className="font-bold text-xl mb-5">
        Filters
      </h3>

      {/* Category */}

      <div className="mb-6">

        <label className="font-semibold">
          Category
        </label>

        <select
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
          className="
            select
            select-bordered
            w-full
            mt-2
          "
        >
          <option value="">
            All Categories
          </option>

          <option value="Electronics">
            Electronics
          </option>

          <option value="Fashion">
            Fashion
          </option>

          <option value="Sports">
            Sports
          </option>

          <option value="Beauty">
            Beauty
          </option>

          <option value="Books">
            Books
          </option>

          <option value="Home & Living">
            Home & Living
          </option>

        </select>

      </div>

      {/* Sort */}

      <div className="mb-6">

        <label className="font-semibold">
          Sort By
        </label>

        <select
          value={sort}
          onChange={(e) =>
            setSort(
              e.target.value
            )
          }
          className="
            select
            select-bordered
            w-full
            mt-2
          "
        >

          <option value="">
            Default
          </option>

          <option value="low-high">
            Price Low → High
          </option>

          <option value="high-low">
            Price High → Low
          </option>

          <option value="rating">
            Top Rated
          </option>

        </select>

      </div>

      <button
        onClick={() => {

          setCategory("");
          setSort("");

        }}
        className="
          btn
          btn-primary
          w-full
          hover:scale-[1.02]
          transition-all
          duration-300
        "
      >
        Reset Filters
      </button>

    </div>
  );
};

export default ShopSidebar;