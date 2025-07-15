import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, Send, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Mensaje enviado",
      description: "Te contactaremos a la brevedad. ¡Gracias por elegirnos!",
    });

    setFormData({
      name: '',
      phone: '',
      email: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: "Teléfonos",
      details: [
        { label: "Rosario", value: "+54 341 439-7465", link: "tel:+5493414397465" },
        { label: "Mar del Plata", value: "+54 223 477-1190", link: "tel:+5492234771190" }
      ]
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Email",
      details: [
        { label: "Consultas generales", value: "eldirecto@live.com.ar", link: "mailto:eldirecto@live.com.ar" }
      ]
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-primary" />,
      title: "WhatsApp",
      details: [
        { label: "Rosario", value: "+54 341 439-7465", link: "https://wa.me/5493414397465" },
        { label: "Mar del Plata", value: "+54 223 477-1190", link: "https://wa.me/5492234771190" }
      ]
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-transport-navy mb-4">
            Contacto
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-8"></div>
          <p className="text-lg text-transport-gray max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Contactanos por el medio que prefieras o completá el formulario.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-transport-navy mb-6">
                Información de Contacto
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="bg-card rounded-lg p-6 shadow-soft">
                    <div className="flex items-center gap-3 mb-4">
                      {info.icon}
                      <h4 className="text-lg font-semibold text-transport-navy">
                        {info.title}
                      </h4>
                    </div>
                    <div className="space-y-2">
                      {info.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center justify-between">
                          <span className="text-transport-gray">{detail.label}:</span>
                          <a 
                            href={detail.link}
                            target={detail.link.startsWith('http') ? '_blank' : '_self'}
                            rel={detail.link.startsWith('http') ? 'noopener noreferrer' : ''}
                            className="text-primary hover:text-primary-dark transition-smooth font-medium"
                          >
                            {detail.value}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card rounded-lg p-6 shadow-soft">
              <h4 className="text-lg font-semibold text-transport-navy mb-4">
                Contacto Rápido
              </h4>
              <div className="space-y-3">
                <Button 
                  variant="whatsapp" 
                  className="w-full justify-start gap-3"
                  onClick={() => window.open('https://wa.me/5493414397465', '_blank')}
                >
                  <MessageCircle size={20} />
                  WhatsApp Rosario
                </Button>
                <Button 
                  variant="whatsapp" 
                  className="w-full justify-start gap-3"
                  onClick={() => window.open('https://wa.me/5492234771190', '_blank')}
                >
                  <MessageCircle size={20} />
                  WhatsApp Mar del Plata
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-lg p-8 shadow-card">
            <h3 className="text-2xl font-bold text-transport-navy mb-6">
              Envianos tu consulta
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-transport-navy mb-2">
                    Nombre completo *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-transport-navy mb-2">
                    Teléfono *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Tu número de teléfono"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-transport-navy mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-transport-navy mb-2">
                  Mensaje *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full"
                  placeholder="Contanos sobre tu consulta o necesidad de envío..."
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full flex items-center gap-3"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Enviar consulta
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-transport-blue-subtle rounded-lg">
              <p className="text-sm text-transport-gray">
                <strong>Tiempo de respuesta:</strong> Te contactaremos dentro de las 24 horas hábiles.
                Para consultas urgentes, preferí el contacto telefónico o WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;