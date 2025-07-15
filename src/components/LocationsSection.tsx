import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

const LocationsSection: React.FC = () => {
  const locations = [
    {
      city: "Rosario",
      address: "Sucre 1070",
      phone: "+54 341 439-7465",
      hours: {
        weekdays: "Lunes a Viernes: 7:30 - 15:30",
        saturday: "Sábados: 7:30 - 11:30",
        sunday: "Domingos: Cerrado"
      }
    },
    {
      city: "Mar del Plata",
      address: "Teodoro Bronzini 2953",
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">

          <div className="bg-card rounded-lg shadow-card p-5 text-center">
            <div className="bg-transport-blue-subtle rounded-lg p-12 mb-4">
              <MapPin className="w-10 h-10 text-primary mx-auto mb-2" />
              <h3 className="text-xl font-semibold text-transport-navy mb-3">
                Sucursal Mar del Plata
              </h3>
              <div className="w-full h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10668.789698399297!2d-57.592805002337836!3d-37.99549622443571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584d93ea488288d%3A0xaf6e9ff6aeeeb324!2sEl%20Directo!5e0!3m2!1ses-419!2sar!4v1721065757482!5m2!1ses-419!2sar"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg shadow-card p-5 text-center">
            <div className="bg-transport-blue-subtle rounded-lg p-12 mb-4">
              <MapPin className="w-10 h-10 text-primary mx-auto mb-2" />
              <h3 className="text-xl font-semibold text-transport-navy mb-3">
                Sucursal Rosario
              </h3>
              <div className="w-full h-[300px]">
                <div className="w-full h-[300px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.8742825394545!2d-60.69367562355524!3d-32.94047227356854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7acb3e8c1dccb%3A0x283f28125e408192!2sSucre%201070%2C%20S2002SGF%20Rosario%2C%20Santa%20Fe!5e0!3m2!1ses-419!2sar!4v1721068955432!5m2!1ses-419!2sar"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LocationsSection;