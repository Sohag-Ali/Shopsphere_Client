const CategorySearch = ({
  search,
  setSearch,
}) => {
  return (
    <div className="mt-6 flex justify-center">

      <div
        className="
          flex items-center
          w-full max-w-3xl

          bg-base-100
          border border-base-300

          rounded-2xl
          shadow-lg

          overflow-hidden

          focus-within:border-primary
          focus-within:shadow-xl

          transition-all duration-300
        "
      >

        <div className="px-5 text-primary text-xl">
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
            h-14

            bg-transparent
            outline-none
            border-none

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

              transition
            "
          >
            ✕
          </button>
        )}

        <button
          className="
            h-10
            px-6
            mr-2

            btn
            btn-primary

            rounded-xl

            font-semibold
          "
        >
          Search
        </button>

      </div>

    </div>
  );
};

export default CategorySearch;