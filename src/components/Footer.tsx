import { Truck } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

const Footer = () => {
  const { adminData } = useAdmin();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transport-gray text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Transportadora El Directo</h3>
                <span className="text-sm text-white/80">SRL</span>
              </div>
            </div>
            <p className="text-white/80 text-sm">
              Más de 60 años brindando soluciones logísticas confiables y eficientes 
              en el transporte de carga entre Rosario y Mar del Plata.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Enlaces Rápidos</h4>
            <nav className="space-y-2">
              <a href="#inicio" className="block text-white/80 hover:text-white transition-colors">
                Inicio
              </a>
              <a href="#sobre-nosotros" className="block text-white/80 hover:text-white transition-colors">
                Sobre Nosotros
              </a>
              <a href="#sucursales" className="block text-white/80 hover:text-white transition-colors">
                Sucursales
              </a>
              <a href="#horarios" className="block text-white/80 hover:text-white transition-colors">
                Horarios
              </a>
              <a href="#contacto" className="block text-white/80 hover:text-white transition-colors">
                Contacto
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contacto</h4>
            <div className="space-y-2 text-white/80 text-sm">
              <p>📍 <strong>Rosario:</strong> {adminData.contact.telefono}</p>
              <p>📍 <strong>Mar del Plata:</strong> {adminData.contact.telefono}</p>
              <p>✉️ {adminData.contact.email}</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © {currentYear} Transportadora El Directo SRL. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 text-sm text-white/60">
              <a href="#" className="hover:text-white transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Términos de Servicio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;