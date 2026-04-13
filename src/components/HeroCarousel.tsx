import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const carouselData = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80",
    title: "Transporte de Carga Confiable",
    description: "Más de 60 años conectando Rosario y Mar del Plata con soluciones logísticas eficientes",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1920&q=80",
    title: "Seguridad en Cada Entrega",
    description: "Unidades monitoreadas y personal altamente capacitado para proteger su mercadería",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1920&q=80",
    title: "Puntualidad Garantizada",
    description: "Cumplimos con los plazos de entrega porque sabemos que su tiempo es valioso",
  },
];

const SWIPE_THRESHOLD = 50;

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const dragStart = useRef<number | null>(null);
  const isDragging = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? carouselData.length - 1 : prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStart.current = e.clientX;
    isDragging.current = true;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current || dragStart.current === null) return;
    const diff = e.clientX - dragStart.current;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff < 0) goToNext();
      else goToPrevious();
    }
    dragStart.current = null;
    isDragging.current = false;
  };

  return (
    <section
      id="inicio"
      className="relative h-screen overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => { dragStart.current = null; isDragging.current = false; }}
    >
      <div className="relative w-full h-full pointer-events-none">
        {carouselData.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
          >
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" draggable={false} />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {carouselData[currentIndex]?.title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              {carouselData[currentIndex]?.description}
            </p>
          </div>
        </div>
      </div>

      <Button variant="ghost" size="icon" onClick={goToPrevious} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12 pointer-events-auto">
        <ChevronLeft className="w-8 h-8" />
      </Button>
      <Button variant="ghost" size="icon" onClick={goToNext} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12 pointer-events-auto">
        <ChevronRight className="w-8 h-8" />
      </Button>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 pointer-events-auto">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
