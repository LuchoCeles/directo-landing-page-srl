import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/transport-hero.jpg';

interface HeroSectionProps {
  onContactClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+542235838574', '_blank');
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-hero pt-16 md:pt-0">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Transporte El Directo" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-hero"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Company Name */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-transport-navy mb-6 animate-fade-in">
            Transporte
            <span className="block text-primary">El Directo SRL</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-transport-gray mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
            Más de 30 años conectando distancias con responsabilidad y eficiencia.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button 
              variant="whatsapp" 
              size="xl" 
              onClick={handleWhatsAppClick}
              className="flex items-center gap-3"
            >
              <MessageCircle size={20} />
              Contactar por WhatsApp
            </Button>
            
            <Button 
              variant="hero" 
              size="xl" 
              onClick={onContactClick}
              className="flex items-center gap-3"
            >
              <Phone size={20} />
              Llamar Ahora
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center animate-fade-in">
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 shadow-soft">
              <div className="text-3xl font-bold text-primary mb-2">30+</div>
              <div className="text-transport-gray">Años de experiencia</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 shadow-soft">
              <div className="text-3xl font-bold text-primary mb-2">2</div>
              <div className="text-transport-gray">Sucursales principales</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 shadow-soft">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-transport-gray">Confianza y seguridad</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Hidden on mobile/tablet */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:block">
        <div className="w-6 h-10 border-2 border-transport-gray rounded-full flex justify-center">
          <div className="w-1 h-3 bg-transport-gray rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
