import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ShopHeader from "./ShopHeader";
import ShopSidebar from "./ShopSidebar";
import ProductCard from "../../coponents/Card/ProductCard ";
import { useSearchParams } from "react-router";



const Shop = () => {

  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();

const deal = searchParams.get("deal") || "";

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
        `/products?search=${search}&category=${category}&sort=${sort}&deal=${deal}&page=${page}&limit=${limit}`
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
    deal,
    page
  ]);

  const totalPages =
    Math.ceil(count / limit);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

      {/* Header */}
      <ShopHeader />

      <div
        className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8"
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
      flex flex-col sm:flex-row
      items-stretch sm:items-center
      bg-base-100
      rounded-2xl
      shadow-lg
      border border-base-300
      overflow-hidden
      hover:shadow-xl
      focus-within:border-primary
      transition-all duration-300
    "
  >
    <div
      className="
        px-5
        flex items-center justify-center
        text-2xl text-primary
      "
    >
      🔍
    </div>

    <input
      type="text"
      placeholder="Search products..."
      className="
        flex-1
        h-14 sm:h-16
        px-4
        bg-transparent
        border-none
        outline-none
      "
      onChange={(e) => setSearch(e.target.value)}
    />

    <button
      className="
        m-2
        sm:mr-2
        h-12
        px-6
        sm:px-8
        rounded-xl
        bg-primary
        text-primary-content
        hover:scale-105
        transition-all
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
    : deal === "true"
    ? `Showing ${count} Deal Products`
    : `Showing ${count} Products`
  }
</h2>

</div>

          {/* Product Grid */}

          <div
  className="
    grid
    grid-cols-1
    sm:grid-cols-2
    xl:grid-cols-3
    gap-4 sm:gap-6
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
           showDiscount={true}
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