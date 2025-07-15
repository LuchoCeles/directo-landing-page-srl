import React from 'react';
import { Truck, Shield, Clock, Users } from 'lucide-react';

const AboutSection: React.FC = () => {
  const features = [
    {
      icon: <Truck className="w-8 h-8 text-primary" />,
      title: "Flota Moderna",
      description: "Vehículos equipados con la última tecnología para garantizar la seguridad de tus envíos."
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Seguridad Garantizada",
      description: "Todos nuestros envíos están asegurados y monitoreados durante todo el trayecto."
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Puntualidad",
      description: "Cumplimos con los horarios establecidos para que recibas tus encomiendas a tiempo."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Atención Personalizada",
      description: "Nuestro equipo está siempre disponible para resolver todas tus consultas."
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-transport-navy mb-4">
            ¿Quiénes somos?
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-lg text-transport-gray leading-relaxed">
              En <span className="font-semibold text-primary">Transporte El Directo SRL</span> contamos 
              con más de tres décadas de experiencia brindando soluciones logísticas confiables en todo el país.
            </p>
            
            <p className="text-lg text-transport-gray leading-relaxed">
              Desde 1990, conectamos ciudades como <span className="font-semibold text-transport-navy">Rosario</span> y 
              <span className="font-semibold text-transport-navy"> Mar del Plata</span>, ofreciendo un servicio 
              ágil y seguro tanto para transporte de carga como encomiendas.
            </p>
            
            <p className="text-lg text-transport-gray leading-relaxed">
              Nuestra misión es garantizar que cada envío llegue a destino con 
              <span className="font-semibold text-primary"> puntualidad, cuidado y el compromiso</span> que 
              nos caracteriza.
            </p>

            <div className="pt-6">
              <div className="inline-flex items-center gap-2 bg-transport-blue-subtle px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-primary">Fundada en 1990</span>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-card rounded-lg p-6 shadow-soft hover:shadow-card transition-smooth hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  {feature.icon}
                  <h3 className="text-lg font-semibold text-transport-navy ml-3">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-transport-gray text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;