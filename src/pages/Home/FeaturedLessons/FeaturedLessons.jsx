import { FiBookmark, FiShare2 } from "react-icons/fi";


const FeaturedLessons = () => {
    const lessons = [
    {
      id: 1,
      title: "Failure is the Best Teacher",
      description: "Every failure teaches something valuable if you reflect on it.",
      author: "John Doe",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      category: "Growth",
    },
    {
      id: 2,
      title: "Consistency Beats Motivation",
      description: "Small consistent actions create big results over time.",
      author: "Sarah Lee",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      category: "Productivity",
    },
    {
      id: 3,
      title: "Kindness Always Wins",
      description: "Being kind creates impact beyond what you can imagine.",
      author: "Michael Chen",
      image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
      category: "Life",
    },
  ];

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Featured Life Lessons
          </h2>
          <p className="text-gray-500 mt-3">
            Learn from real experiences shared by our community
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
            >
              {/* Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={lesson.image}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  {lesson.category}
                </span>

                <h3 className="text-lg font-semibold mt-3 line-clamp-2">
                  {lesson.title}
                </h3>

                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {lesson.description}
                </p>

                <p className="text-sm text-gray-400 mt-3">
                  By {lesson.author}
                </p>

                {/* Actions */}
                <div className="flex justify-between items-center mt-4">
                  <button className="flex items-center gap-1 text-sm text-primary">
                    <FiBookmark /> Save
                  </button>

                  <button className="flex items-center gap-1 text-sm text-gray-500">
                    <FiShare2 /> Share
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Button */}
        <div className="text-center mt-10">
          <button className="btn btn-primary">
            View All Lessons
          </button>
        </div>

      </div>
    </section>
  );
};


export default FeaturedLessons;