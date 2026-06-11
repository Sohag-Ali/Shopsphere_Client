const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <div className="flex justify-center gap-2 mt-10 flex-wrap">

      <button
        className="btn btn-outline"
        disabled={currentPage === 1}
        onClick={() =>
          setCurrentPage((prev) => prev - 1)
        }
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() =>
            setCurrentPage(index + 1)
          }
          className={`btn ${
            currentPage === index + 1
              ? "btn-primary"
              : "btn-outline"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        className="btn btn-outline"
        disabled={currentPage === totalPages}
        onClick={() =>
          setCurrentPage((prev) => prev + 1)
        }
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;