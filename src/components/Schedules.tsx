import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

const schedules = [
  {
    city: "Rosario",
    schedule: [
      { days: "Lunes a Viernes", hours: "07:30 - 15:30" },
      { days: "Sábados", hours: "07:30 - 12:00" },
      { days: "Domingos", hours: "Cerrado" },
      { days: "Feriados", hours: "Cerrado" },
    ],
  },
  {
    city: "Mar del Plata",
    schedule: [
      { days: "Lunes a Viernes", hours: "08:00 - 16:00" },
      { days: "Sábados", hours: "08:00 - 12:00" },
      { days: "Domingos", hours: "Cerrado" },
      { days: "Feriados", hours: "Cerrado" },
    ],
  },
];

const Schedule = () => {
  return (
    <section id="horarios" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Horarios de Atención</h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Consulte nuestros horarios de atención en cada sucursal
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {schedules.map((location, index) => (
            <Card key={index} className="shadow-card-custom hover:shadow-elegant transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl text-foreground">📍 {location.city}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {location.schedule.map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
                    <span className="font-medium text-foreground">{item.days}</span>
                    <span className={`font-semibold ${item.hours === "Cerrado" ? "text-destructive" : "text-primary"}`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
