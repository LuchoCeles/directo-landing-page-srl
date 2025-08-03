import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

const Contact = () => {
  const { adminData } = useAdmin();
  
  // Safety check: ensure contact is an array
  const contactArray = Array.isArray(adminData.contact) ? adminData.contact : [];
  
  const contactInfo = [
    ...contactArray.map(contact => ({
      icon: Phone,
      title: contact.sucursal || "Sucursal",
      content: contact.telefono,
      action: `tel:${contact.telefono.replace(/\s/g, '')}`
    })),
    ...(contactArray.length > 0 ? [{
      icon: Mail,
      title: "Email",
      content: contactArray[0]?.email || "",
      action: `mailto:${contactArray[0]?.email || ""}`
    }] : []),
    ...(contactArray.length > 0 && contactArray[0]?.whatsapp ? [{
      icon: MessageCircle,
      title: "WhatsApp",
      content: "Contacto directo",
      action: `https://wa.me/${contactArray[0]?.whatsapp?.replace(/\+/g, '') || ""}`
    }] : [])
  ];

  const handleWhatsAppClick = () => {
    if (contactArray.length > 0 && contactArray[0]?.whatsapp) {
      const whatsappNumber = contactArray[0].whatsapp.replace(/\+/g, '');
      window.open(`https://wa.me/${whatsappNumber}?text=Hola,%20me%20interesa%20conocer%20sus%20servicios%20de%20transporte`, "_blank");
    }
  };

  return (
    <section id="contacto" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Contacto
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estamos aquí para ayudarle con sus necesidades de transporte. Contáctenos por cualquiera de nuestros canales.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Información de Contacto
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contactInfo.map((item, index) => (
                <Card key={index} className="shadow-card-custom hover:shadow-elegant transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {item.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* WhatsApp CTA */}
            {contactArray.length > 0 && contactArray[0]?.whatsapp && (
              <div className="mt-8">
                <Button
                  onClick={handleWhatsAppClick}
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700 text-white shadow-elegant"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contactar por WhatsApp
                </Button>
              </div>
            )}

            {/* Address Section */}
            <Card className="mt-6 shadow-card-custom">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Nuestras Direcciones</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactArray.map((contact, index) => (
                  <div key={contact.id || index}>
                    <h4 className="font-semibold text-foreground">📍 {contact.sucursal}</h4>
                    <p className="text-muted-foreground text-sm">
                      {contact.address}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="shadow-card-custom">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">
                  Envíanos un Mensaje
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Nombre *
                    </label>
                    <Input 
                      placeholder="Su nombre completo"
                      className="border-border focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Empresa
                    </label>
                    <Input 
                      placeholder="Nombre de la empresa"
                      className="border-border focus:ring-primary"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Email *
                  </label>
                  <Input 
                    type="email"
                    placeholder="correo@empresa.com"
                    className="border-border focus:ring-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Teléfono
                  </label>
                  <Input 
                    type="tel"
                    placeholder="+54 XXX XXX-XXXX"
                    className="border-border focus:ring-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Mensaje *
                  </label>
                  <Textarea 
                    placeholder="Describa su consulta o requerimiento..."
                    rows={5}
                    className="border-border focus:ring-primary resize-none"
                  />
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full bg-primary hover:bg-primary/90 shadow-elegant"
                >
                  Enviar Mensaje
                </Button>
                
                <p className="text-xs text-muted-foreground">
                  * Campos obligatorios. Sus datos serán tratados de forma confidencial.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;