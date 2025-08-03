import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

const Branches = () => {
  const { adminData } = useAdmin();

  const branches = (adminData.contact as unknown as any[]).map(contact => ({
    city: contact.sucursal || "Sin nombre",
    address: contact.address,
    phone: contact.telefono
  }));

  return (
    <section id="sucursales" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Dónde Estamos
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nuestras sucursales estratégicamente ubicadas para brindar el mejor servicio
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {branches.map((branch, index) => (
            <Card key={index} className="shadow-card-custom hover:shadow-elegant transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl text-foreground">
                  {branch.city}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  {branch.address}
                </p>
                <div className="flex items-center justify-center space-x-2 text-primary">
                  <Phone className="w-4 h-4" />
                  <span className="font-semibold">{branch.phone}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Google Maps Embed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
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
        </div>
      </div>
    </section>
  );
};

export default Branches;