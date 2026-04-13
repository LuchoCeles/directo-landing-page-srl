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

const SWIPE_THRESHOLD = 80;

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isDragging) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [isDragging]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? carouselData.length - 1 : prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
  }, []);

  const getAdjacentIndex = (direction: "next" | "prev") => {
    if (direction === "next") return currentIndex === carouselData.length - 1 ? 0 : currentIndex + 1;
    return currentIndex === 0 ? carouselData.length - 1 : currentIndex - 1;
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || dragStartX.current === null) return;
    const diff = e.clientX - dragStartX.current;
    setDragOffset(diff);
  };

  const handlePointerEnd = () => {
    if (!isDragging) return;
    if (Math.abs(dragOffset) > SWIPE_THRESHOLD) {
      if (dragOffset < 0) goToNext();
      else goToPrevious();
    }
    setDragOffset(0);
    setIsDragging(false);
    dragStartX.current = null;
  };

  // Calculate how much of the next/prev slide to reveal (0 to 1)
  const revealProgress = Math.min(Math.abs(dragOffset) / (sectionRef.current?.offsetWidth || 1000), 1);
  const draggingDirection = dragOffset < 0 ? "next" : "prev";
  const incomingIndex = dragOffset < 0 ? getAdjacentIndex("next") : getAdjacentIndex("prev");

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative h-screen overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerLeave={handlePointerEnd}
    >
      {/* Slides */}
      <div className="relative w-full h-full pointer-events-none">
        {carouselData.map((slide, index) => {
          let translateX = "0%";
          let opacity = index === currentIndex ? 1 : 0;
          let zIndex = index === currentIndex ? 10 : 0;

          if (isDragging && dragOffset !== 0) {
            if (index === currentIndex) {
              // Current slide moves with drag
              translateX = `${dragOffset}px`;
              opacity = 1 - revealProgress * 0.3;
              zIndex = 10;
            } else if (index === incomingIndex) {
              // Incoming slide enters from the side
              const startPos = draggingDirection === "next" ? 100 : -100;
              const currentPos = startPos * (1 - revealProgress);
              translateX = `${currentPos}%`;
              opacity = 0.4 + revealProgress * 0.6;
              zIndex = 20;
            }
          }

          const isActive = index === currentIndex || (isDragging && index === incomingIndex);

          return (
            <div
              key={slide.id}
              className={`absolute inset-0 ${!isDragging ? "transition-opacity duration-1000" : ""}`}
              style={{
                opacity,
                transform: `translateX(${translateX})`,
                zIndex,
                transition: isDragging ? "none" : undefined,
                visibility: isActive ? "visible" : "hidden",
              }}
            >
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" draggable={false} />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          );
        })}
      </div>

      {/* Text overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          opacity: isDragging ? 1 - revealProgress : 1,
          transform: isDragging ? `translateX(${dragOffset * 0.5}px)` : undefined,
          transition: isDragging ? "none" : "opacity 0.5s ease",
        }}
      >
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

      {/* Incoming text overlay */}
      {isDragging && dragOffset !== 0 && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            opacity: revealProgress,
            transform: `translateX(${(draggingDirection === "next" ? 30 : -30) * (1 - revealProgress)}px)`,
          }}
        >
          <div className="container mx-auto px-4 text-center text-white">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {carouselData[incomingIndex]?.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                {carouselData[incomingIndex]?.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation buttons */}
      <Button variant="ghost" size="icon" onClick={goToPrevious} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12 pointer-events-auto z-30">
        <ChevronLeft className="w-8 h-8" />
      </Button>
      <Button variant="ghost" size="icon" onClick={goToNext} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12 pointer-events-auto z-30">
        <ChevronRight className="w-8 h-8" />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 pointer-events-auto z-30">
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
