import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transport-navy text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">Transporte El Directo SRL</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Más de 30 años conectando distancias con responsabilidad y eficiencia.
            </p>
            <div className="text-sm text-gray-400">
              Fundada en 1990
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#hero" className="hover:text-white transition-smooth">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-smooth">
                  Nosotros
                </a>
              </li>
              <li>
                <a href="#locations" className="hover:text-white transition-smooth">
                  Sucursales
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-white transition-smooth">
                  Horarios
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-smooth">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Rosario Office */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Sucursal Rosario</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+5493414397465" className="hover:text-white transition-smooth">
                  +54 341 439-7465
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5" />
                <div className="text-sm">
                  <div>Lun-Vie: 7:30-15:30</div>
                  <div>Sáb: 7:30-11:00</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mar del Plata Office */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Sucursal Mar del Plata</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a href="tel:+5492234771190" className="hover:text-white transition-smooth">
                  +54 223 477-1190
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5" />
                <div className="text-sm">
                  <div>Lun-Vie: 8:00-16:00</div>
                  <div>Sáb: 8:00-12:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Email */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-300">
              <Mail className="w-4 h-4" />
              <a 
                href="mailto:eldirecto@live.com.ar" 
                className="hover:text-white transition-smooth"
              >
                eldirecto@live.com.ar
              </a>
            </div>
            <div className="flex gap-4">
              <a 
                href="https://wa.me/5493414397465" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-whatsapp hover:bg-whatsapp-dark px-4 py-2 rounded-lg text-white text-sm transition-smooth"
              >
                WhatsApp Rosario
              </a>
              <a 
                href="https://wa.me/5492234771190" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-whatsapp hover:bg-whatsapp-dark px-4 py-2 rounded-lg text-white text-sm transition-smooth"
              >
                WhatsApp Mar del Plata
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Transporte El Directo SRL. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;