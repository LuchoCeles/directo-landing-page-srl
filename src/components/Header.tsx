import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-sm shadow-elegant border-b border-border" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">TD</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-foreground">
                Transportadora El Directo
              </h1>
              <span className="text-sm text-muted-foreground">SRL</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Button
              variant="ghost"
              onClick={() => scrollToSection("inicio")}
              className="text-foreground hover:text-primary transition-fast"
            >
              Inicio
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("sobre-nosotros")}
              className="text-foreground hover:text-primary transition-fast"
            >
              Sobre Nosotros
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("sucursales")}
              className="text-foreground hover:text-primary transition-fast"
            >
              Sucursales
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("horarios")}
              className="text-foreground hover:text-primary transition-fast"
            >
              Horarios
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("contacto")}
              className="text-foreground hover:text-primary transition-fast"
            >
              Contacto
            </Button>
            <Button
              variant="ghost"
              onClick={() => window.open('/admin', '_blank')}
              className="text-foreground hover:text-primary transition-fast text-xs"
            >
              Admin
            </Button>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;