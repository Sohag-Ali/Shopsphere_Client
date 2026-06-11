import CategoryCard from "../../coponents/Card/CategoryCard";
import CategoryCardSkeleton from "../../coponents/Skeleton/CategoryCardSkeleton";
import EmptyState from "./EmptyState";


const CategoryGrid = ({
  categories,
  isLoading,
}) => {

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {[...Array(6)].map(
          (_, index) => (
            <CategoryCardSkeleton
              key={index}
            />
          )
        )}

      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <EmptyState
        message="No Category Found"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          category={category}
        />
      ))}

    </div>
  );
};

export default CategoryGrid;