import { Truck } from "lucide-react";

const contactData = [
  { sucursal: "Rosario", telefono: "(0341) 123-4567", email: "rosario@transporte-srl.com" },
  { sucursal: "Mar del Plata", telefono: "(0223) 765-4321", email: "mdp@transporte-srl.com" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-transport-gray text-white py-12">
      <div className="container justify-start px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          <div className="max-w-md space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Transporte</h3>
                <span className="text-sm text-white/80">SRL</span>
              </div>
            </div>
            <p className="text-white/80 text-sm">
              Más de 60 años brindando soluciones logísticas confiables y eficientes
              en el transporte de carga entre Rosario y Mar del Plata.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contacto</h4>
            <div className="space-y-2 text-white/80 text-sm">
              {contactData.map((contact, index) => (
                <div key={index}>
                  <p>📍 <strong>{contact.sucursal}:</strong> {contact.telefono}</p>
                  <p>✉️ {contact.email}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © {currentYear} Transporte SRL. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 text-sm text-white/60">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Términos de Servicio</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
