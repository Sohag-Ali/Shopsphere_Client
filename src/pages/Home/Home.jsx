import useTitle from "../../hooks/useTitle";
import Categories from "./Categories/Categories";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import MostSavedLessons from "./MostSavedLessons/MostSavedLessons";
import TopContributors from "./TopContributors/TopContributors";
import WhyLearning from "./WhyLearning/WhyLearning";


const Home = () => {
    return (
      useTitle("Home"),
        <main className="bg-base-100 overflow-x-hidden">

      {/* Hero */}
      {/* <section>
        <HeroBanner></HeroBanner>
      </section> */}

      {/* Featured Lessons */}
      <section className=" bg-[#0F172A]   md:px-6 lg:px-8">
        <FeaturedProducts></FeaturedProducts>
      </section>

      <section className=" bg-[#0F172A]   md:px-6 lg:px-8">
        <Categories></Categories>
      </section>

      {/* Why Learning */}
      <section className="">
        <WhyLearning></WhyLearning>
      </section>

      {/* Top Contributors */}
      <section className="bg-[#0F172A] ">
       <TopContributors></TopContributors>
      </section>

      {/* Most Saved Lessons */}
      <section className="">
        <MostSavedLessons></MostSavedLessons>
      </section>

    </main>
  );
};


export default Home;