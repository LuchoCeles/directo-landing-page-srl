import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Save, X, MoveUp, MoveDown } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { CarouselItem } from "@/types/admin";
import { useToast } from "@/hooks/use-toast";

const CarouselManager = () => {
  const { adminData, updateCarousel } = useAdmin();
  const { toast } = useToast();
  const [editingItem, setEditingItem] = useState<CarouselItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<CarouselItem>>({});
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleSave = () => {
    if (editingItem) {
      const updatedCarousel = adminData.carousel.map(item =>
        item.id === editingItem.id ? editingItem : item
      );
      updateCarousel(updatedCarousel);
      setEditingItem(null);
      toast({
        title: "Elemento actualizado",
        description: "Los cambios han sido guardados correctamente",
      });
    }
  };

  const handleAddNew = () => {
    if (newItem.imageUrl && newItem.title && newItem.description) {
      const newCarouselItem: CarouselItem = {
        id: Date.now().toString(),
        imageUrl: newItem.imageUrl,
        title: newItem.title,
        description: newItem.description,
        order: adminData.carousel.length + 1
      };
      
      updateCarousel([...adminData.carousel, newCarouselItem]);
      setNewItem({});
      setIsAddingNew(false);
      toast({
        title: "Elemento agregado",
        description: "Nueva imagen agregada al carrusel",
      });
    }
  };

  const handleDelete = (id: string) => {
    const updatedCarousel = adminData.carousel.filter(item => item.id !== id);
    updateCarousel(updatedCarousel);
    toast({
      title: "Elemento eliminado",
      description: "La imagen ha sido removida del carrusel",
    });
  };

  const moveItem = (id: string, direction: 'up' | 'down') => {
    const currentIndex = adminData.carousel.findIndex(item => item.id === id);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === adminData.carousel.length - 1)
    ) {
      return;
    }

    const newCarousel = [...adminData.carousel];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    [newCarousel[currentIndex], newCarousel[targetIndex]] = 
    [newCarousel[targetIndex], newCarousel[currentIndex]];
    
    // Actualizar el order
    newCarousel.forEach((item, index) => {
      item.order = index + 1;
    });

    updateCarousel(newCarousel);
    toast({
      title: "Orden actualizado",
      description: "El orden del carrusel ha sido modificado",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Gestión del Carrusel</h3>
        <Button 
          onClick={() => setIsAddingNew(true)}
          className="flex items-center space-x-2"
          disabled={isAddingNew}
        >
          <Plus className="w-4 h-4" />
          <span>Agregar Imagen</span>
        </Button>
      </div>

      {/* Add New Item Form */}
      {isAddingNew && (
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Nueva Imagen del Carrusel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">URL de la Imagen *</label>
              <Input
                placeholder="https://ejemplo.com/imagen.jpg"
                value={newItem.imageUrl || ''}
                onChange={(e) => setNewItem({...newItem, imageUrl: e.target.value})}
              />
              <p className="text-xs text-muted-foreground">
                Recomendación: Use servicios como Google Drive, Imgur o su CDN preferido
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Título *</label>
              <Input
                placeholder="Título principal de la imagen"
                value={newItem.title || ''}
                onChange={(e) => setNewItem({...newItem, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Descripción *</label>
              <Textarea
                placeholder="Descripción que aparecerá debajo del título"
                value={newItem.description || ''}
                onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                rows={3}
              />
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={handleAddNew} className="flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Guardar</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAddingNew(false);
                  setNewItem({});
                }}
                className="flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancelar</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Items */}
      <div className="grid gap-4">
        {adminData.carousel.map((item, index) => (
          <Card key={item.id} className="shadow-card-custom">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Image Preview */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Vista Previa</label>
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTAwQzE1NSA5NSAxNjAgMTAwIDE2NSAxMDBDMTcwIDEwMCAxNzUgMTA1IDE3NSAxMTBDMTc1IDExNSAxNzAgMTIwIDE2NSAxMjBIMTM1QzEzMCAxMjAgMTI1IDExNSAxMjUgMTEwQzEyNSAxMDUgMTMwIDEwMCAxMzUgMTAwSDE1MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHN2Zz4K";
                      }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-2 space-y-4">
                  {editingItem?.id === item.id ? (
                    // Edit Mode
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">URL de la Imagen</label>
                        <Input
                          value={editingItem.imageUrl}
                          onChange={(e) => setEditingItem({...editingItem, imageUrl: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Título</label>
                        <Input
                          value={editingItem.title}
                          onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Descripción</label>
                        <Textarea
                          value={editingItem.description}
                          onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                          rows={3}
                        />
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button onClick={handleSave} size="sm" className="flex items-center space-x-1">
                          <Save className="w-4 h-4" />
                          <span>Guardar</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setEditingItem(null)}
                          size="sm"
                          className="flex items-center space-x-1"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancelar</span>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-semibold text-foreground">{item.title}</h4>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setEditingItem(item)}
                          className="flex items-center space-x-1"
                        >
                          <Edit className="w-4 h-4" />
                          <span>Editar</span>
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => moveItem(item.id, 'up')}
                          disabled={index === 0}
                          className="flex items-center space-x-1"
                        >
                          <MoveUp className="w-4 h-4" />
                          <span>Subir</span>
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => moveItem(item.id, 'down')}
                          disabled={index === adminData.carousel.length - 1}
                          className="flex items-center space-x-1"
                        >
                          <MoveDown className="w-4 h-4" />
                          <span>Bajar</span>
                        </Button>
                        
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                          className="flex items-center space-x-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Eliminar</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {adminData.carousel.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <p className="text-muted-foreground mb-4">No hay imágenes en el carrusel</p>
            <Button onClick={() => setIsAddingNew(true)}>
              Agregar primera imagen
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CarouselManager;
