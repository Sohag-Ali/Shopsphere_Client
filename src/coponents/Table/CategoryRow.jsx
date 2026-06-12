const CategoryRow = ({
  category,
  handleEdit,
  handleDelete,
}) => {
  return (
    <tr>
      {/* Image */}

      <td>
        <img
          src={category.image}
          alt={category.name}
          className="
            w-12
            h-12
            sm:w-14
            sm:h-14
            lg:w-16
            lg:h-16

            rounded-xl
            object-cover
          "
        />
      </td>

      {/* Category Name */}

      <td>
        <h3
          className="
            font-semibold

            text-sm
            sm:text-base

            max-w-[120px]
            sm:max-w-[180px]
            lg:max-w-[250px]

            break-words
            line-clamp-2
          "
        >
          {category.name}
        </h3>
      </td>

      {/* Product Count */}

      <td>
        <span
          className="
            badge
            badge-primary

            badge-sm
            sm:badge-md
          "
        >
          {category.productCount}
          <span className="hidden sm:inline">
            {" "}Products
          </span>
        </span>
      </td>

      {/* Actions */}

      <td>
        <div
          className="
            flex
            flex-col
            xl:flex-row

            gap-2

            min-w-[120px]
          "
        >
          <button
            onClick={() =>
              handleEdit(category)
            }
            className="
              btn
              btn-info

              btn-xs
              sm:btn-sm
            "
          >
            Edit
          </button>

          <button
            onClick={() =>
              handleDelete(
                category._id
              )
            }
            className="
              btn
              btn-error

              btn-xs
              sm:btn-sm
            "
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CategoryRow;