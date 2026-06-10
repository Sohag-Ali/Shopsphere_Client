import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ShopHeader from "./ShopHeader";
import ShopSidebar from "./ShopSidebar";
import ProductCard from "../../coponents/Card/ProductCard ";



const Shop = () => {

  const axiosSecure = useAxiosSecure();

  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);


  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const [page, setPage] = useState(1);

  const limit = 8;

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

          <div className="mb-6">

            <input
              type="text"
              placeholder="Search products..."
              className="
                input
                input-bordered
                w-full
              "
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

          {/* Product Count */}

          <div className="mb-6">

            <h2 className="text-lg font-semibold">

              Showing {count} Products

            </h2>

          </div>

          {/* Product Grid */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-6
            "
          >

            {products.map((product) => (

              <ProductCard
                key={product._id}
                product={product}
              />

            ))}

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