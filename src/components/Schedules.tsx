import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { Schedule } from "@/types/admin";

interface GroupedSchedule {
  city: string;
  schedule: {
    days: string;
    hours: string;
  }[];
}

const Schedules = () => {
  const { adminData } = useAdmin();

  const scheduleArray: Schedule[] = Array.isArray(adminData.schedule) ? adminData.schedule : [];

  // Agrupar horarios por sucursal
  const groupedSchedules = scheduleArray.reduce((acc: Record<string, Schedule[]>, schedule) => {
    const sucursalNombre = schedule.sucursal.nombre;
    if (!acc[sucursalNombre]) {
      acc[sucursalNombre] = [];
    }
    acc[sucursalNombre].push(schedule);
    return acc;
  }, {});

  // Formatear datos para la vista
  const schedules: GroupedSchedule[] = Object.entries(groupedSchedules).map(([city, scheduleList]) => ({
    city,
    schedule: scheduleList.map(s => ({
      days: s.dia,
      hours: s.horario
    }))
  }));

  return (
    <section id="horarios" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Horarios de Atención
          </h2>
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
                <CardTitle className="text-2xl text-foreground">
                  📍 {location.city}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {location.schedule.map((item, scheduleIndex) => (
                  <div key={scheduleIndex} className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
                    <span className="font-medium text-foreground">
                      {item.days}
                    </span>
                    <span className={`font-semibold ${item.hours === "Cerrado"
                      ? "text-destructive"
                      : "text-primary"
                      }`}>
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

export default Schedules;