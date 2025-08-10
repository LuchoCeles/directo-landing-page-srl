import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import AboutUs from "@/components/AboutUs";
import Branches from "@/components/Branches";
import Schedules from "@/components/Schedules";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroCarousel />
        <AboutUs />
        <Branches />
        <Schedules />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;