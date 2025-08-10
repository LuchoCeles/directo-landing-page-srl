import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/contexts/AdminContext";
import { CarouselItem } from "@/types/admin";

const HeroCarousel = () => {
  const { adminData } = useAdmin();
  const [carouselData, setCarouselData] = useState<CarouselItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (adminData.carousel && adminData.carousel.length > 0) {
      setCarouselData(adminData.carousel);
    }
  }, [adminData.carousel]);

  useEffect(() => {
    if (carouselData.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [carouselData.length]);

  const goToPrevious = () => {
    if (carouselData.length === 0) return;
    setCurrentIndex(currentIndex === 0 ? carouselData.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    if (carouselData.length === 0) return;
    setCurrentIndex(currentIndex === carouselData.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index: number) => {
    if (carouselData.length === 0) return;
    setCurrentIndex(index);
  };

  if (carouselData.length === 0) {
    return (
      <section id="inicio" className="relative h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p>Cargando carrusel...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="inicio" className="relative h-screen overflow-hidden">
      {/* Carousel Images */}
      <div className="relative w-full h-full">
        {carouselData.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {carouselData[currentIndex]?.title || ""}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              {carouselData[currentIndex]?.description || ""}
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg shadow-elegant"
            >
              Conocer más
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <Button
        variant="ghost"
        size="icon"
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12"
      >
        <ChevronLeft className="w-8 h-8" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12"
      >
        <ChevronRight className="w-8 h-8" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
              }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;