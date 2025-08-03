import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Save, Edit, Clock } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { Schedule } from "@/types/admin";
import { useToast } from "@/hooks/use-toast";
import { AddScheduleForm } from "./AddSchedule"
import { Plus, Trash2 } from 'lucide-react';
import { DELETE } from "../../services/fetch.js";

const ScheduleManager = () => {
  const { adminData, updateSchedule } = useAdmin();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editSchedule, setEditSchedule] = useState<Schedule[]>(adminData.schedule);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddSuccess = () => {
    setShowAddForm(false);
  };

  const handleSave = () => {
    updateSchedule(editSchedule);
    setIsEditing(false);
    toast({
      title: "Horarios actualizados",
      description: "Los horarios de atención han sido guardados correctamente",
    });
  };

  const handleDeleteSucursal = async (sucursal: string) => {
    try {
      // Filtrar los horarios de la sucursal a eliminar
      const horariosAEliminar = adminData.schedule.filter(s => s.sucursal === sucursal);

      const deletePromises = horariosAEliminar.map(horario =>
        DELETE(`/admin/horarios/${horario.id}`)
      );

      const results = await Promise.all(deletePromises);
      const allSuccess = results.every(r => r.ok);

      if (allSuccess) {
        const updatedSchedules = adminData.schedule.filter(s => s.sucursal !== sucursal);
        updateSchedule(updatedSchedules);

        toast({
          title: "Sucursal eliminada",
          description: `La sucursal ${sucursal} y sus horarios han sido eliminados`,
        });
      } else {
        throw new Error('Error al eliminar algunos horarios');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "No se pudo eliminar la sucursal",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setEditSchedule(adminData.schedule);
    setIsEditing(false);
  };

  const updateLocationSchedule = (location: string, day: string, value: string) => {
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
        <div className="flex mr-1">
          <div className="mr-6">
            {!showAddForm && (
              <Button onClick={() => setShowAddForm(!isCreating)}
                className="flex items-center space-x-2"
              >
                <Plus className="mr-2 h-4 w-4" />
                Agregar Sucursal
              </Button>
            )}
          </div>
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
        {adminData.schedule.map((locationSchedules, index) => {
          const sucursal = locationSchedules.sucursal;
          const horarios = adminData.schedule.filter(s => s.sucursal === sucursal);

          // Solo mostrar una tarjeta por sucursal (evitar duplicados)
          if (adminData.schedule.findIndex(s => s.sucursal === sucursal) !== index) {
            return null;
          }

          return (
            <Card key={sucursal} className="shadow-card-custom">
              <CardHeader className="flex justify-between items-start">
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>📍 {sucursal}</span>
                </CardTitle>

              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    {horarios.map((horario) => (
                      <div key={`${sucursal}-${horario.dia}`} className="space-y-2">
                        <label className="text-sm font-medium">{horario.dia}</label>
                        <Input
                          value={horario.horario}
                          onChange={(e) => updateLocationSchedule(sucursal, horario.dia, e.target.value)}
                          placeholder="Ej: 08:00 – 16:00"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {horarios.map((horario) => (
                      <div key={`${sucursal}-${horario.dia}`} className="flex justify-between items-center py-2 border-b border-border">
                        <span className="font-medium">{horario.dia}</span>
                        <span className={horario.horario === 'Cerrado' ?
                          'text-destructive font-semibold' : 'text-primary font-semibold'}>
                          {horario.horario}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {isEditing && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteSucursal(sucursal)}
                    className="flex items-center space-x-1"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Eliminar Sucursal</span>
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {showAddForm && (
        <AddScheduleForm onAddSuccess={handleAddSuccess} onCancel={() => setShowAddForm(false)} />
      )}

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