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

const SWIPE_THRESHOLD = 60;

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Auto-advance: uses a ref for isDragging to avoid restarting the interval on every drag
  const isDraggingRef2 = useRef(false);
  useEffect(() => {
    isDraggingRef2.current = isDragging;
  }, [isDragging]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDraggingRef2.current) {
        setCurrentIndex((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
      }
    }, 6000);
    return () => clearInterval(interval);
  }, []); // stable — never restarts

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? carouselData.length - 1 : prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === carouselData.length - 1 ? 0 : prev + 1));
  }, []);

  const getAdjacentIndex = (direction: "next" | "prev", base: number) => {
    if (direction === "next") return base === carouselData.length - 1 ? 0 : base + 1;
    return base === 0 ? carouselData.length - 1 : base - 1;
  };

  // ── Touch handlers (mobile) ──────────────────────────────────────────────
  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    isDraggingRef.current = true;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || startXRef.current === null) return;
    setDragOffset(e.touches[0].clientX - startXRef.current);
  };

  const handleTouchEnd = () => {
    if (!isDraggingRef.current) return;
    setDragOffset((offset) => {
      if (Math.abs(offset) > SWIPE_THRESHOLD) {
        offset < 0 ? goToNext() : goToPrevious();
      }
      return 0;
    });
    isDraggingRef.current = false;
    setIsDragging(false);
    startXRef.current = null;
  };

  // ── Pointer handlers (desktop mouse) ────────────────────────────────────
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return; // let touch handlers deal with it
    startXRef.current = e.clientX;
    isDraggingRef.current = true;
    setIsDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === "touch" || !isDraggingRef.current || startXRef.current === null) return;
    setDragOffset(e.clientX - startXRef.current);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    if (!isDraggingRef.current) return;
    setDragOffset((offset) => {
      if (Math.abs(offset) > SWIPE_THRESHOLD) {
        offset < 0 ? goToNext() : goToPrevious();
      }
      return 0;
    });
    isDraggingRef.current = false;
    setIsDragging(false);
    startXRef.current = null;
  };

  // ── Slide positioning ────────────────────────────────────────────────────
  const sectionWidth = sectionRef.current?.offsetWidth || 1000;
  const revealProgress = Math.min(Math.abs(dragOffset) / sectionWidth, 1);
  const draggingDirection = dragOffset < 0 ? "next" : "prev";
  const incomingIndex =
    dragOffset < 0
      ? getAdjacentIndex("next", currentIndex)
      : getAdjacentIndex("prev", currentIndex);

  const getSlideStyle = (index: number): React.CSSProperties => {
    if (!isDragging || dragOffset === 0) {
      const isActive = index === currentIndex;
      return {
        opacity: isActive ? 1 : 0,
        transform: "translateX(0%)",
        zIndex: isActive ? 10 : 0,
        visibility: isActive ? "visible" : "hidden",
        transition: "opacity 1000ms ease",
      };
    }

    if (index === currentIndex) {
      return {
        opacity: 1,
        transform: `translateX(${dragOffset}px)`,
        zIndex: 10,
        visibility: "visible",
        transition: "none",
      };
    }

    if (index === incomingIndex) {
      const startPercent = draggingDirection === "next" ? 100 : -100;
      return {
        opacity: 1,
        transform: `translateX(${startPercent * (1 - revealProgress)}%)`,
        zIndex: 20,
        visibility: "visible",
        transition: "none",
      };
    }

    return { opacity: 0, zIndex: 0, visibility: "hidden", transition: "none" };
  };

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative h-screen overflow-hidden select-none"
      style={{ touchAction: "pan-y" }}
      // Touch (mobile)
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      // Pointer (desktop mouse)
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {carouselData.map((slide, index) => (
        <div
          key={slide.id}
          className="absolute inset-0"
          style={getSlideStyle(index)}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div className="absolute inset-0 bg-black/40" />

          {/* Text moves with the slide */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="container mx-auto px-6 text-center text-white">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-white/90 drop-shadow">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows — desktop only */}
      <Button
        variant="ghost"
        size="icon"
        onClick={goToPrevious}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12 z-30 cursor-pointer"
      >
        <ChevronLeft className="w-8 h-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={goToNext}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12 z-30 cursor-pointer"
      >
        <ChevronRight className="w-8 h-8" />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-30">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
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