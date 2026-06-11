
import useTitle from "../../hooks/useTitle";
import BlogPreview from "./BlogPreview/BlogPreview";
import Categories from "./Categories/Categories";
import CustomerReviews from "./CustomerReviews/CustomerReviews";
import FAQ from "./FAQ/FAQ";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";
import Newsletter from "./Newsletter/Newsletter";
import SpecialDeals from "./SpecialDeals/SpecialDeals";
import Statistics from "./Statistics/Statistics";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";



const Home = () => {
    return (
      useTitle("Home"),
        <main className="bg-base-200 text-base-content overflow-x-hidden">

      {/* Hero */}
      {/* <section>
        <HeroBanner></HeroBanner>
      </section> */}

      {/* Featured Lessons */}
      <section className="md:px-6 lg:px-8">
        <FeaturedProducts></FeaturedProducts>
      </section>

      <section className="md:px-6 lg:px-8">
        <Categories></Categories>
      </section>

        <section className="md:px-6 lg:px-8">
        <SpecialDeals></SpecialDeals>
      </section>

      {/* Why Learning */}
      <section className="md:px-6 lg:px-8">
        <WhyChooseUs></WhyChooseUs>
      </section>

      {/* Top Contributors */}
      <section className="md:px-6 lg:px-8">
       <Statistics></Statistics>
      </section>

      {/* Most Saved Lessons */}
      <section className="md:px-6 lg:px-8">
        <CustomerReviews></CustomerReviews>
      </section>

      <section className="md:px-6 lg:px-8">
        <BlogPreview></BlogPreview>
      </section>

        <section className=" md:px-6 lg:px-8">
        <FAQ></FAQ>
      </section>

        <section className=" md:px-6 lg:px-8">
        <Newsletter></Newsletter>
      </section>

    </main>
  );
};


export default Home;