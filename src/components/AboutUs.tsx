import { Card, CardContent } from "@/components/ui/card";
import { Truck, Shield, Clock, Award } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

const AboutUs = () => {
  const { adminData } = useAdmin();
  const features = [
    {
      icon: Truck,
      title: "Experiencia",
      description: "Más de 60 años en el sector del transporte"
    },
    {
      icon: Shield,
      title: "Seguridad",
      description: "Unidades monitoreadas y personal capacitado"
    },
    {
      icon: Clock,
      title: "Puntualidad",
      description: "Cumplimiento garantizado en cada entrega"
    },
    {
      icon: Award,
      title: "Calidad",
      description: "Compromiso con la excelencia en el servicio"
    }
  ];

  return (
    <section id="sobre-nosotros" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Sobre Nosotros
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            {adminData.about.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-lg text-muted-foreground leading-relaxed">
                {paragraph.includes('Transporte El Directo SRL') ? (
                  <>
                    {paragraph.split('Transporte El Directo SRL')[0]}
                    <strong className="text-foreground">Transportadora El Directo SRL</strong>
                    {paragraph.split('Transporte El Directo SRL')[1]}
                  </>
                ) : (
                  paragraph
                )}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 shadow-card-custom hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">+60</div>
            <div className="text-muted-foreground">Años de experiencia</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">+50.000</div>
            <div className="text-muted-foreground">Entregas por año</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-primary">100%</div>
            <div className="text-muted-foreground">Atención personalizada</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;