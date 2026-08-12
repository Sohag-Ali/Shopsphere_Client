import { Outlet, useLocation } from "react-router";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer/Footer";
import Container from "../coponents/Container/Container";
import HeroBanner from "../pages/Home/HeroBanner/HeroBanner";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import ScrollToTop from "../coponents/ScrollToTop";
import { AnimatePresence } from "framer-motion";
import PageTransition from "../coponents/Motion/PageTransition";

const RootLayout = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();

    setTimeout(() => {
      NProgress.done();
    }, 500);
  }, [location]);

  return (
    <div className="min-h-screen bg-base-200 text-base-content flex flex-col overflow-x-hidden">
      <ScrollToTop />
      <header className="w-full bg-base-100/90 backdrop-blur-xl border-b border-base-300 shadow-[0_8px_32px_rgba(0,0,0,0.1)] sticky top-0 z-50 px-4 md:px-8 transition-all duration-300">
        <Navbar />
      </header>

      {location.pathname === "/" && (
        <HeroBanner />
      )}

      <Container className="grow">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </Container>

      <footer className="w-full bg-base-100 border-t border-base-300 mt-auto">
        <Container>
          <Footer />
        </Container>
      </footer>
    </div>
  );
};

export default RootLayout;
