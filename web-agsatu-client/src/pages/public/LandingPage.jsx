import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import About from "../../components/About";
import Services from "../../components/Services";
import Team from "../../components/Team";
import Portfolio from "../../components/Portfolio";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
import ScrollToTop from "../../components/ScrollToTop";

export default function LandingPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const observeAll = () => {
      document
        .querySelectorAll(
          ".reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)",
        )
        .forEach((el) => {
          observer.observe(el);
        });
    };

    observeAll();

    // Services & Portfolio ambil data dari API secara async, jadi elemen
    // ".reveal" barunya baru muncul belakangan. MutationObserver ini
    // mendeteksi elemen baru itu dan langsung mendaftarkannya juga.
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Team />
      <Portfolio />
      <Contact />
      <Footer />
      <ScrollToTop />
    </>
  );
}
