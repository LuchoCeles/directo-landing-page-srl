import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Save, Edit, Clock } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { Schedule } from "@/types/admin";
import { useToast } from "@/hooks/use-toast";
import { PATCH } from "../../services/fetch.js"

const ScheduleManager = () => {
  const { adminData, updateSchedule } = useAdmin();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editSchedule, setEditSchedule] = useState<Schedule[]>(adminData.schedule);
  const [originalSchedule, setOriginalSchedule] = useState<Schedule[]>(adminData.schedule);

  const handleSave = async () => {
    try {
      const modifiedSchedules = editSchedule
        .filter((schedule, index) => schedule.horario !== originalSchedule[index].horario)
        .map(({ id, dia, horario }) => ({ id, dia, horario }));

      if (modifiedSchedules.length === 0) {
        setIsEditing(false);
        return toast({
          title: "Sin cambios",
          description: "No se detectaron cambios en los horarios",
        });
      }

      console.log(modifiedSchedules);
      const response = await PATCH('/admin/horarios', { 
        schedules: modifiedSchedules 
      });

      if (response.ok) {
        updateSchedule(editSchedule);
        setOriginalSchedule(editSchedule);
        setIsEditing(false);
        toast({
          title: "Horarios actualizados",
          description: `Se actualizaron ${modifiedSchedules.length} horarios`,
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al actualizar elemento');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "No se pudo actualizar el elemento",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setEditSchedule(originalSchedule);
    setIsEditing(false);
  };

  const updateLocationSchedule = (id: number, value: string) => {
    setEditSchedule(prev =>
      prev.map(schedule =>
        schedule.id === id
          ? { ...schedule, horario: value }
          : schedule
      )
    );
  };

  const getSucursalesUnicas = () => {
    const sucursales = editSchedule.map(s => s.sucursal);
    return sucursales.filter((sucursal, index, self) => 
      index === self.findIndex(s => s.id === sucursal.id)
    );
  };

  const getHorariosPorSucursal = (sucursalId: number) => {
    return editSchedule.filter(s => s.sucursal.id === sucursalId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Gestión de Horarios</h3>
        <div className="flex mr-1">
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
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {getSucursalesUnicas().map((sucursal) => {
          const horarios = getHorariosPorSucursal(sucursal.id);

          return (
            <Card key={sucursal.id} className="shadow-card-custom">
              <CardHeader className="flex justify-between items-start">
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>📍 {sucursal.nombre}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    {horarios.map((horario) => (
                      <div key={horario.id} className="space-y-2">
                        <label className="text-sm font-medium">{horario.dia}</label>
                        <Input
                          value={horario.horario}
                          onChange={(e) => updateLocationSchedule(horario.id, e.target.value)}
                          placeholder="Ej: 08:00 – 16:00"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {horarios.map((horario) => (
                      <div key={horario.id} className="flex justify-between items-center py-2 border-b border-border">
                        <span className="font-medium">{horario.dia}</span>
                        <span className={horario.horario === 'Cerrado' ?
                          'text-destructive font-semibold' : 'text-primary font-semibold'}>
                          {horario.horario}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
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

      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Guía Recomendada</CardTitle>
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