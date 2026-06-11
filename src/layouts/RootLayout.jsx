import { Outlet, useLocation } from "react-router";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";
import Container from "../coponents/Container/Container";
import HeroBanner from "../pages/Home/HeroBanner/HeroBanner";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import ScrollToTop from "../coponents/ScrollToTop";

const RootLayout = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();

    setTimeout(() => {
      NProgress.done();
    }, 500);
  }, [location]);
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
       <ScrollToTop />
      <header className="w-full bg-base-100 backdrop-blur-xl border-b border-base-300 shadow-[0_8px_32px_rgba(0,0,0,0.25)] sticky top-0 z-50  px-4 md:px-8">
        {/* <Container> */}
        <Navbar />
        {/* </Container> */}
      </header>

      {location.pathname === "/" && (
        <>
          <HeroBanner></HeroBanner>
        </>
      )}

      <Container>
        <Outlet></Outlet>
      </Container>

      <footer className="w-full bg-base-100 border-t border-base-300">
        <Container>
          <Footer />
        </Container>
      </footer>
    </div>
  );
};

export default RootLayout;
