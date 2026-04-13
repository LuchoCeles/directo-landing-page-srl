import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import ContactForm from "./ContactForm";

const contactData = [
  {
    sucursal: "Rosario",
    address: "Sucre 1070, Rosario, Santa Fe",
    telefono: "(0341) 123-4567",
    email: "rosario@transporte-srl.com",
    whatsapp: "+5493411234567",
  },
  {
    sucursal: "Mar del Plata",
    address: "Mar del Plata, Buenos Aires",
    telefono: "(0223) 765-4321",
    email: "mdp@transporte-srl.com",
    whatsapp: "+5492237654321",
  },
];

const Contact = () => {
  const handleWhatsAppClick = (whatsappNumber: string) => {
    const cleanedNumber = whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanedNumber}?text=Hola,%20me%20interesa%20conocer%20sus%20servicios%20de%20transporte`, "_blank");
  };

  return (
    <section id="contacto" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Contacto</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estamos aquí para ayudarle con sus necesidades de transporte. Contáctenos por cualquiera de nuestros canales.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">Información de Contacto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactData.map((sucursal, index) => (
                <Card key={index} className="shadow-card-custom hover:shadow-elegant transition-all duration-300 w-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">📍 {sucursal.sucursal}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">Dirección</h4>
                        <p className="text-muted-foreground text-sm">{sucursal.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">Teléfono</h4>
                        <span className="text-muted-foreground text-sm">{sucursal.telefono}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Mail className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">Email</h4>
                        <a href={`mailto:${sucursal.email}`} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                          {sucursal.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MessageCircle className="w-5 h-5 mt-1 text-primary flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">WhatsApp</h4>
                        <button onClick={() => handleWhatsAppClick(sucursal.whatsapp)} className="text-muted-foreground text-sm hover:text-primary transition-colors text-left">
                          {sucursal.whatsapp}
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default Contact;
