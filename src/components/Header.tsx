import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Truck } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsMobileMenuOpen(false); // Cerrar menú móvil después de navegar
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-background/95 backdrop-blur-sm shadow-elegant border-b border-border"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                <Truck />
              </span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold text-foreground">
                Transportadora El Directo
              </h1>
              <span className="text-sm text-muted-foreground">SRL</span>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Button
              variant="ghost"
              onClick={() => scrollToSection("inicio")}
              className="text-foreground hover:text-accent-foreground hover:bg-accent transition-fast"
            >
              Inicio
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("sobre-nosotros")}
              className="text-foreground hover:text-accent-foreground hover:bg-accent transition-fast"
            >
              Sobre Nosotros
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("sucursales")}
              className="text-foreground hover:text-accent-foreground hover:bg-accent transition-fast"
            >
              Sucursales
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("horarios")}
              className="text-foreground hover:text-accent-foreground hover:bg-accent transition-fast"
            >
              Horarios
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection("contacto")}
              className="text-foreground hover:text-accent-foreground hover:bg-accent transition-fast"
            >
              Contacto
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-foreground"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection("inicio")}
                  className="justify-start text-lg text-foreground hover:text-accent-foreground hover:bg-accent"
                >
                  Inicio
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection("sobre-nosotros")}
                  className="justify-start text-lg text-foreground hover:text-accent-foreground hover:bg-accent"
                >
                  Sobre Nosotros
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection("sucursales")}
                  className="justify-start text-lg text-foreground hover:text-accent-foreground hover:bg-accent"
                >
                  Sucursales
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection("horarios")}
                  className="justify-start text-lg text-foreground hover:text-accent-foreground hover:bg-accent"
                >
                  Horarios
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => scrollToSection("contacto")}
                  className="justify-start text-lg text-foreground hover:text-accent-foreground hover:bg-accent"
                >
                  Contacto
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;