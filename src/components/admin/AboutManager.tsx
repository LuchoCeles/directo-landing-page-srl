import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Save, Edit, Eye } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";
import { PATCH } from "../../services/fetch.js";

const AboutManager = () => {
  const { adminData, updateAbout } = useAdmin();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(adminData.about);
  const [originalContent, setOriginalContent] = useState(adminData.about);

  useEffect(() => {
    setEditContent(adminData.about);
    setOriginalContent(adminData.about);
  }, [adminData.about]);

  const hasChanges = () => {
    return editContent.content !== originalContent.content;
  };

  const handleSave = async () => {
    if (!hasChanges()) {
      toast({
        title: "Sin cambios",
        description: "No se detectaron modificaciones para guardar",
      });
      setIsEditing(false);
      return;
    }

    try {
      const response = await PATCH("/admin/about", editContent);
      if (response.ok) {
        updateAbout(editContent);
        setOriginalContent(editContent);
        setIsEditing(false);
        toast({
          title: "Contenido actualizado",
          description: "La sección 'Sobre Nosotros' ha sido actualizada correctamente",
        });
      } else {
        throw new Error("Error al actualizar el contenido");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "No se pudo actualizar el contenido",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setEditContent(originalContent);
    setIsEditing(false);
  };

  const toggleEditMode = () => {
    if (isEditing && hasChanges()) {
      if (confirm("¿Estás seguro de que deseas descartar los cambios?")) {
        handleCancel();
      }
    } else {
      setIsEditing(!isEditing);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Gestión de "Sobre Nosotros"</h3>
        <Button
          onClick={toggleEditMode}
          variant={isEditing ? "outline" : "default"}
          className="flex items-center space-x-2"
        >
          {isEditing ? (
            <>
              <Eye className="w-4 h-4" />
              <span>Vista Previa</span>
            </>
          ) : (
            <>
              <Edit className="w-4 h-4" />
              <span>Editar Contenido</span>
            </>
          )}
        </Button>
      </div>

      <Card className="shadow-card-custom">
        <CardHeader>
          <CardTitle>Contenido de la Sección</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {isEditing ? (
            // Edit Mode
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Contenido (use saltos de línea para separar párrafos)
                </label>
                <Textarea
                  value={editContent.content}
                  onChange={(e) => setEditContent({ ...editContent, content: e.target.value })}
                  rows={12}
                  className="font-mono text-sm"
                  placeholder="Escriba el contenido de la sección 'Sobre Nosotros'..."
                />
                <p className="text-xs text-muted-foreground">
                  Tip: Use doble salto de línea para separar párrafos
                </p>
              </div>

              <div className="flex space-x-2">
                <Button 
                  onClick={handleSave} 
                  className="flex items-center space-x-2"
                  disabled={!hasChanges()}
                >
                  <Save className="w-4 h-4" />
                  <span>Guardar Cambios</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex items-center space-x-2"
                >
                  <span>Cancelar</span>
                </Button>
              </div>
            </div>
          ) : (
            // Preview Mode
            <div className="space-y-4">
              <div className="bg-muted p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-foreground mb-4">Vista Previa:</h4>
                <div className="prose prose-sm max-w-none">
                  {adminData.about.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Guidelines */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Guías de Escritura</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700">
          <ul className="space-y-2 text-sm">
            <li>• Mantenga un tono profesional y corporativo</li>
            <li>• Incluya información sobre experiencia y trayectoria</li>
            <li>• Mencione las ciudades donde operan</li>
            <li>• Destaque los valores de la empresa (puntualidad, seguridad, confiabilidad)</li>
            <li>• Use párrafos cortos para mejor legibilidad</li>
            <li>• Evite tecnicismos excesivos, mantenga claridad</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutManager;