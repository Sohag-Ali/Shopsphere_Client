const CategoryCardSkeleton = () => {

  return (

    <div
      className="
        card
        bg-base-100
        shadow-lg
        rounded-xl
        overflow-hidden
      "
    >

      <div
        className="
          skeleton
          h-48
          w-full
        "
      ></div>

      <div className="card-body">

        <div
          className="
            skeleton
            h-6
            w-3/4
            mx-auto
          "
        ></div>

        <div
          className="
            skeleton
            h-4
            w-1/2
            mx-auto
          "
        ></div>

      </div>

    </div>

  );

};

export default CategoryCardSkeleton;