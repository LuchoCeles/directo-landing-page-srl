import React from 'react';
import { Clock, Calendar, MapPin } from 'lucide-react';

const ScheduleSection: React.FC = () => {
  const schedules = [
    {
      location: "Rosario",
      icon: <MapPin className="w-6 h-6 text-primary" />,
      schedule: [
        { day: "Lunes a Viernes", time: "7:30 - 15:30", status: "open" },
        { day: "Sábados", time: "7:30 - 11:00", status: "limited" },
        { day: "Domingos", time: "Cerrado", status: "closed" }
      ]
    },
    {
      location: "Mar del Plata",
      icon: <MapPin className="w-6 h-6 text-primary" />,
      schedule: [
        { day: "Lunes a Viernes", time: "8:00 - 16:00", status: "open" },
        { day: "Sábados", time: "8:00 - 12:00", status: "limited" },
        { day: "Domingos", time: "Cerrado", status: "closed" }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'text-green-600';
      case 'limited':
        return 'text-yellow-600';
      case 'closed':
        return 'text-red-600';
      default:
        return 'text-transport-gray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return '🟢';
      case 'limited':
        return '🟡';
      case 'closed':
        return '🔴';
      default:
        return '⚪';
    }
  };

  return (
    <section id="schedule" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-transport-navy mb-4">
            Horarios de Atención
          </h2>
          <div className="w-20 h-1 bg-gradient-primary mx-auto mb-8"></div>
          <p className="text-lg text-transport-gray max-w-2xl mx-auto">
            Conocé nuestros horarios de atención en ambas sucursales para planificar tu visita.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {schedules.map((branch, index) => (
            <div key={index} className="bg-card rounded-lg shadow-card p-8 hover:shadow-button transition-smooth">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-transport-blue-subtle p-3 rounded-full">
                  {branch.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-transport-navy">
                    Sucursal {branch.location}
                  </h3>
                  <p className="text-transport-gray">Horarios de atención</p>
                </div>
              </div>

              {/* Schedule Table */}
              <div className="space-y-4">
                {branch.schedule.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className={`flex items-center justify-between p-4 rounded-lg border-l-4 transition-smooth ${
                      item.status === 'open' ? 'bg-green-50 border-green-500' :
                      item.status === 'limited' ? 'bg-yellow-50 border-yellow-500' :
                      'bg-red-50 border-red-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{getStatusIcon(item.status)}</span>
                      <span className="font-medium text-transport-navy">
                        {item.day}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-transport-gray" />
                      <span className={`font-medium ${getStatusColor(item.status)}`}>
                        {item.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-6 p-4 bg-transport-blue-subtle rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="font-medium text-transport-navy">Información adicional</span>
                </div>
                <ul className="text-sm text-transport-gray space-y-1">
                  <li>• Recomendamos llegar 15 minutos antes del cierre</li>
                  <li>• Horarios especiales en feriados (consultar)</li>
                  <li>• Atención personalizada con turno previo</li>
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Current Status */}
        <div className="mt-12 bg-card rounded-lg shadow-card p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-transport-navy mb-4">
              ¿Necesitás enviar algo fuera de horario?
            </h3>
            <p className="text-transport-gray mb-6">
              Contactanos por WhatsApp y coordinamos una atención especial para casos urgentes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/5493414397465" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-whatsapp text-white px-6 py-3 rounded-lg font-medium hover:bg-whatsapp-dark transition-smooth"
              >
                WhatsApp Rosario
              </a>
              <a 
                href="https://wa.me/5492234771190" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-whatsapp text-white px-6 py-3 rounded-lg font-medium hover:bg-whatsapp-dark transition-smooth"
              >
                WhatsApp Mar del Plata
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;