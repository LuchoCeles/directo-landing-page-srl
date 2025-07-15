import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

const LocationsSection: React.FC = () => {
  const locations = [
    {
      city: "Rosario",
      address: "Consultar dirección exacta",
      phone: "+54 341 439-7465",
      hours: {
        weekdays: "Lunes a Viernes: 7:30 - 15:30",
        saturday: "Sábados: 7:30 - 11:00",
        sunday: "Domingos: Cerrado"
      }
    },
    {
      city: "Mar del Plata",
      address: "Consultar dirección exacta",
      phone: "+54 223 477-1190",
      hours: {
        weekdays: "Lunes a Viernes: 8:00 - 16:00",
        saturday: "Sábados: 8:00 - 12:00",
        sunday: "Domingos: Cerrado"
      }
    }
  ];

  return (
    <section id="locations" className="py-20 bg-gradient-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-transport-navy mb-4">
            Nuestras Sucursales
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-8"></div>
          <p className="text-lg text-transport-gray max-w-2xl mx-auto">
            Atendemos en nuestras dos sucursales estratégicas en Rosario y Mar del Plata. 
            Acercate a la que te quede más cómoda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {locations.map((location, index) => (
            <div key={index} className="bg-card rounded-lg shadow-card p-8 hover:shadow-button transition-smooth">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-transport-blue-subtle p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-transport-navy mb-2">
                    Sucursal {location.city}
                  </h3>
                  <p className="text-transport-gray">{location.address}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary" />
                  <a 
                    href={`tel:${location.phone}`}
                    className="text-transport-navy hover:text-primary transition-smooth font-medium"
                  >
                    {location.phone}
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div className="text-transport-gray">
                    <div className="font-medium text-transport-navy mb-1">Horarios de atención:</div>
                    <div className="text-sm space-y-1">
                      <div>🕒 {location.hours.weekdays}</div>
                      <div>🕒 {location.hours.saturday}</div>
                      <div>❌ {location.hours.sunday}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map placeholder */}
        <div className="bg-card rounded-lg shadow-card p-8 text-center">
          <div className="bg-transport-blue-subtle rounded-lg p-12 mb-6">
            <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-transport-navy mb-2">
              Mapa de Ubicaciones
            </h3>
            <p className="text-transport-gray">
              Próximamente: Mapa interactivo con nuestras ubicaciones exactas
            </p>
          </div>
          <p className="text-sm text-transport-gray">
            Para conocer las direcciones exactas, contactanos directamente por teléfono o WhatsApp.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;