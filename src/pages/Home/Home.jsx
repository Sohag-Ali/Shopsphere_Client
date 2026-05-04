import FeaturedLessons from "./FeaturedLessons/FeaturedLessons";
import HeroBanner from "./HeroBanner/HeroBanner";
import MostSavedLessons from "./MostSavedLessons/MostSavedLessons";
import TopContributors from "./TopContributors/TopContributors";
import WhyLearning from "./WhyLearning/WhyLearning";


const Home = () => {
    return (
        <main className="bg-base-100 overflow-x-hidden">

      {/* Hero */}
      <section>
        <HeroBanner></HeroBanner>
      </section>

      {/* Featured Lessons */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <FeaturedLessons></FeaturedLessons>
      </section>

      {/* Why Learning */}
      <section className="bg-base-200">
        <WhyLearning></WhyLearning>
      </section>

      {/* Top Contributors */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
       <TopContributors></TopContributors>
      </section>

      {/* Most Saved Lessons */}
      <section className="bg-base-200">
        <MostSavedLessons></MostSavedLessons>
      </section>

    </main>
  );
};


export default Home;