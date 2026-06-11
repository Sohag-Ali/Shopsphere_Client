import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ShopHeader from "./ShopHeader";
import ShopSidebar from "./ShopSidebar";
import ProductCard from "../../coponents/Card/ProductCard ";



const Shop = () => {

  const axiosSecure = useAxiosSecure();

  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);


  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const [page, setPage] = useState(1);

  const limit = 9;

  useEffect(() => {

    axiosSecure
      .get(
        `/products?search=${search}&category=${category}&sort=${sort}&page=${page}&limit=${limit}`
      )
      .then((res) => {

        setProducts(res.data.products);
        setCount(res.data.total);

      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [
    axiosSecure,
    search,
    category,
    sort,
    page
  ]);

  const totalPages =
    Math.ceil(count / limit);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

      {/* Header */}
      <ShopHeader />

      <div
        className="
          grid
          lg:grid-cols-4
          gap-8
        "
      >

        {/* Sidebar */}

        <div>

          <ShopSidebar
            category={category}
            setCategory={setCategory}
            sort={sort}
            setSort={setSort}
          />

        </div>

        {/* Products Area */}

        <div className="lg:col-span-3">

          {/* Search */}

        <div className="mb-8">

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
    "
  >

    <div
      className="
        px-5
        text-2xl
        text-primary
      "
    >
      🔍
    </div>

    <input
      type="text"
      placeholder="Search products, brands, categories..."
      className="
        flex-1
        h-16
        bg-transparent
        border-none
        outline-none
        focus:outline-none
        focus:ring-0

        text-base-content
        placeholder:text-base-content/50
      "
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />

    <button
      className="
        h-12
        mr-2
        px-8

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

          {/* Product Count */}

         <div className="mb-6">

  <h2 className="text-lg font-semibold text-base-content">

    {loading
      ? "Loading Products..."
      : `Showing ${count} Products`
    }

  </h2>

</div>

          {/* Product Grid */}

          <div
  className="
    grid
    grid-cols-1
    md:grid-cols-2
    lg:grid-cols-3
    gap-6
  "
>

  {loading
    ? Array(6)
        .fill()
        .map((_, index) => (

          <div
            key={index}
            className="
              card
              bg-base-100
              shadow-lg
            "
          >

            <div className="skeleton h-52 w-full"></div>

            <div className="card-body">

              <div className="skeleton h-6 w-3/4"></div>

              <div className="skeleton h-4 w-full"></div>

              <div className="skeleton h-4 w-2/3"></div>

              <div className="skeleton h-10 w-full mt-4"></div>

            </div>

          </div>

        ))
    : products.map((product) => (

        <ProductCard
          key={product._id}
          product={product}
        />

      ))
  }

</div>

          {/* Pagination */}

          <div
            className="
              flex
              justify-center
              gap-2
              mt-12
            "
          >

            {
              [...Array(totalPages).keys()]
                .map((number) => (

                  <button
                    key={number}
                    onClick={() =>
                      setPage(number + 1)
                    }
                    className={`
                      btn
                      ${
                        page === number + 1
                          ? "btn-primary"
                          : "btn-outline"
                      }
                    `}
                  >

                    {number + 1}

                  </button>

                ))
            }

          </div>

        </div>

      </div>

    </div>
  );
};

export default Shop;