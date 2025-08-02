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
  const [newSchedule, setNewSchedule] = useState<Schedule>({
    sucursal: '',
    dia: '',
    horario: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSchedule(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await POST('/admin/horarios', newSchedule);

      if (!response.ok) {
        toast({
          title: "Error",
          description: "Error al Agregar una Sucursal",
          variant: "destructive"
        });
      }
      const updatedSchedules = [...adminData.schedule, newSchedule];
      updateSchedule(updatedSchedules);
      setNewSchedule({ sucursal: '', dia: '', horario: '' });
      onAddSuccess();
      toast({
        title: "Contenido Agregado",
        description: "Los horarios de atención han sido guardados correctamente"
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
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
          <div className="space-y-2">
            <label htmlFor="sucursal" className="block text-sm font-medium">
              Nombre de la Sucursal
            </label>
            <Input
              id="sucursal"
              name="sucursal"
              value={newSchedule.sucursal}
              onChange={handleInputChange}
              required
              placeholder="Ej: Rosario Centro"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="dia" className="block text-sm font-medium">
              Dias Abierto
            </label>
            <Input
              id="dia"
              name="dia"
              value={newSchedule.dia}
              onChange={handleInputChange}
              required
              placeholder="Ej: Lunes a Viernes"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="horario" className="block text-sm font-medium">
              Horario
            </label>
            <Input
              id="horario"
              name="horario"
              value={newSchedule.horario}
              onChange={handleInputChange}
              required
              placeholder="Ej: 08:00 – 16:00"
            />
          </div>

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