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

  const handleWhatsAppClick = (whatsappNumber: string) => {
    const cleanedNumber = whatsappNumber.replace(/\+/g, '');
    window.open(`https://wa.me/${cleanedNumber}?text=Hola,%20me%20interesa%20conocer%20sus%20servicios%20de%20transporte`, "_blank");
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

            <div className="flex items-start gap-4">
              {contactArray.map((sucursal, index) => (
                <Card key={index} className="shadow-card-custom hover:shadow-elegant transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">
                     📍 {sucursal.sucursal || "Sucursal"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 mt-1 text-primary" />
                      <div>
                        <h4 className="font-medium text-foreground">Dirección</h4>
                        <p className="text-muted-foreground text-sm">
                          {sucursal.address || "No especificada"}
                        </p>
                      </div>
                    </div>

                    {sucursal.telefono && (
                      <div className="flex items-start gap-4">
                        <Phone className="w-5 h-5 mt-1 text-primary" />
                        <div>
                          <h4 className="font-medium text-foreground">Teléfono</h4>
                          <span className="text-muted-foreground text-sm">
                            {sucursal.telefono}
                          </span>
                        </div>
                      </div>
                    )}

                    {sucursal.email && (
                      <div className="flex items-start gap-4">
                        <Mail className="w-5 h-5 mt-1 text-primary" />
                        <div>
                          <h4 className="font-medium text-foreground">Email</h4>
                          <a
                            href={`mailto:${sucursal.email}`}
                            className="text-muted-foreground text-sm hover:text-primary transition-colors"
                          >
                            {sucursal.email}
                          </a>
                        </div>
                      </div>
                    )}

                    {sucursal.whatsapp && (
                      <div className="flex items-start gap-4">
                        <MessageCircle className="w-5 h-5 mt-1 text-primary" />
                        <div>
                          <h4 className="font-medium text-foreground">WhatsApp</h4>
                          <button
                            onClick={() => handleWhatsAppClick(sucursal.whatsapp)}
                            className="text-muted-foreground text-sm hover:text-primary transition-colors text-left"
                          >
                            {sucursal.whatsapp}
                          </button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
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