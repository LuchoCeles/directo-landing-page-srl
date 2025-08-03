import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAdmin } from "@/contexts/AdminContext";
import { PlusCircle, Loader2 } from 'lucide-react';
import { Schedule } from '@/types/admin';
import { Save } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { POST } from "../../services/fetch.js"

export const AddScheduleForm = ({ onAddSuccess, onCancel }: { onAddSuccess: () => void; onCancel: () => void; }) => {
  const { adminData, updateSchedule } = useAdmin();
  const [newSchedules, setNewSchedules] = useState<Schedule[]>([
    { sucursal: '', dia: 'Lunes a Viernes', horario: '' },
    { sucursal: '', dia: 'Sábado', horario: '' },
    { sucursal: '', dia: 'Domingo', horario: '' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleInputChange = (index: number, field: keyof Schedule, value: string) => {
    const updatedSchedules = [...newSchedules];
    updatedSchedules[index] = { ...updatedSchedules[index], [field]: value };
    
    // Actualizar sucursal en todos los horarios si se cambia en el primero
    if (field === 'sucursal' && index === 0) {
      updatedSchedules.forEach((schedule, i) => {
        if (i !== 0) {
          updatedSchedules[i] = { ...schedule, sucursal: value };
        }
      });
    }
    
    setNewSchedules(updatedSchedules);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validar que la sucursal esté completa
      if (!newSchedules[0].sucursal) {
        throw new Error('Debe ingresar el nombre de la sucursal');
      }

      // Validar horarios
      const hasEmptySchedule = newSchedules.some(schedule => !schedule.horario);
      if (hasEmptySchedule) {
        throw new Error('Todos los horarios deben ser completados');
      }

      // Enviar cada horario al servidor
      const responses = await Promise.all(
        newSchedules.map(schedule => POST('/admin/horarios', schedule))
      );

      const hasError = responses.some(response => !response.ok);
      if (hasError) {
        throw new Error('Error al agregar algunos horarios');
      }

      // Combinar con los horarios existentes
      const updatedSchedules = [...adminData.schedule, ...newSchedules];
      updateSchedule(updatedSchedules);
      
      // Resetear formulario
      setNewSchedules([
        { sucursal: '', dia: 'Lunes a Viernes', horario: '' },
        { sucursal: '', dia: 'Sábado', horario: '' },
        { sucursal: '', dia: 'Domingo', horario: '' }
      ]);
      
      onAddSuccess();
      toast({
        title: "Horarios agregados",
        description: "Los horarios han sido guardados correctamente"
      });
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : 'Error desconocido',
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-primary" />
          Agregar Nueva Sucursal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre de la sucursal (solo en el primer horario) */}
          <div className="space-y-2">
            <label htmlFor="sucursal" className="block text-sm font-medium">
              Nombre de la Sucursal
            </label>
            <Input
              id="sucursal"
              value={newSchedules[0].sucursal}
              onChange={(e) => handleInputChange(0, 'sucursal', e.target.value)}
              required
              placeholder="Ej: Rosario Centro"
            />
          </div>

          {/* Horarios */}
          {newSchedules.map((schedule, index) => (
            <div key={index} className="space-y-2">
              <label htmlFor={`dia-${index}`} className="block text-sm font-medium">
                {schedule.dia}
              </label>
              <Input
                id={`horario-${index}`}
                value={schedule.horario}
                onChange={(e) => handleInputChange(index, 'horario', e.target.value)}
                required
                placeholder={index === 2 ? 'Ej: Cerrado' : 'Ej: 08:00 – 16:00'}
              />
            </div>
          ))}

          <div className="flex justify-start space-x-4 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Agregar Sucursal</span>
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};