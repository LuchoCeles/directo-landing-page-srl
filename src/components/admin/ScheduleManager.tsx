import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Save, Edit, Clock } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { Schedule } from "@/types/admin";
import { useToast } from "@/hooks/use-toast";

const ScheduleManager = () => {
  const { adminData, updateSchedule } = useAdmin();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editSchedule, setEditSchedule] = useState<Schedule>(adminData.schedule);

  const handleSave = () => {
    updateSchedule(editSchedule);
    setIsEditing(false);
    toast({
      title: "Horarios actualizados",
      description: "Los horarios de atención han sido guardados correctamente",
    });
  };

  const handleCancel = () => {
    setEditSchedule(adminData.schedule);
    setIsEditing(false);
  };

  const updateLocationSchedule = (location: 'rosario' | 'marDelPlata', day: string, value: string) => {
    setEditSchedule({
      ...editSchedule,
      [location]: {
        ...editSchedule[location],
        [day]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Gestión de Horarios</h3>
        <Button 
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "outline" : "default"}
          className="flex items-center space-x-2"
        >
          {isEditing ? (
            <span>Cancelar</span>
          ) : (
            <>
              <Edit className="w-4 h-4" />
              <span>Editar Horarios</span>
            </>
          )}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Rosario */}
        <Card className="shadow-card-custom">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>📍 {editSchedule.sucursal}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Lunes a Viernes</label>
                  <Input
                    value={editSchedule.horario}
                    onChange={(e) => updateLocationSchedule('rosario', 'weekdays', e.target.value)}
                    placeholder="07:30 – 15:30"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sábados</label>
                  <Input
                    value={editSchedule.horario}
                    onChange={(e) => updateLocationSchedule('rosario', 'saturday', e.target.value)}
                    placeholder="08:00 – 11:30"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Domingos</label>
                  <Input
                    value={editSchedule.horario}
                    onChange={(e) => updateLocationSchedule('rosario', 'sunday', e.target.value)}
                    placeholder="Cerrado"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="font-medium">Lunes a Viernes</span>
                  <span className="text-primary font-semibold">{adminData.schedule.horario}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="font-medium">Sábados</span>
                  <span className="text-primary font-semibold">{adminData.schedule.horario}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">Domingos</span>
                  <span className={adminData.schedule.horario === 'Cerrado' ? 'text-destructive font-semibold' : 'text-primary font-semibold'}>
                    {adminData.schedule.horario}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {isEditing && (
        <div className="flex justify-center space-x-4">
          <Button onClick={handleSave} className="flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Guardar Cambios</span>
          </Button>
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
        </div>
      )}

      {/* Guidelines */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Formato Recomendado</CardTitle>
        </CardHeader>
        <CardContent className="text-green-700">
          <ul className="space-y-2 text-sm">
            <li>• Use formato de 24 horas: "08:00 – 16:00"</li>
            <li>• Para días cerrados escriba simplemente: "Cerrado"</li>
            <li>• Mantenga consistencia en el formato entre sucursales</li>
            <li>• Use el guión largo (–) para separar horarios de inicio y fin</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleManager;