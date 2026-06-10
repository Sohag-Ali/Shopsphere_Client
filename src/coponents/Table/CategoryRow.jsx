const CategoryRow = ({
  category,
  handleEdit,
  handleDelete,
}) => {

  return (
    <tr>

      <td>

        <img
          src={category.image}
          alt={category.name}
          className="
            w-16
            h-16
            rounded-xl
            object-cover
          "
        />

      </td>

      <td>

        <h3
          className="
            font-semibold
          "
        >
          {category.name}
        </h3>

      </td>

      <td>

        <span
          className="
            badge
            badge-primary
          "
        >
          {category.productCount}
          Products
        </span>

      </td>

      <td>

        <div
          className="
            flex
            gap-2
          "
        >

          <button
            onClick={() =>
              handleEdit(category)
            }
            className="
              btn
              btn-info
              btn-sm
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
              btn-sm
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