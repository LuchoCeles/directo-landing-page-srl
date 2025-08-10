import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Save, X, MoveUp, MoveDown, Upload, ImageOff } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { CarouselItem } from "@/types/admin";
import { useToast } from "@/hooks/use-toast";
import { POST, PATCH, DELETE } from "../../services/fetch.js";

const CarouselManager = () => {
  const { adminData, updateCarousel } = useAdmin();
  const { toast } = useToast();
  const [editingItem, setEditingItem] = useState<CarouselItem | null>(null);
  const [originalEditingItem, setOriginalEditingItem] = useState<CarouselItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<CarouselItem>>({});
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  const hasChanges = () => {
    if (!editingItem || !originalEditingItem) return false;

    return (
      editingItem.title !== originalEditingItem.title ||
      editingItem.description !== originalEditingItem.description ||
      editingItem.imageFile !== null
    );
  };

  useEffect(() => {
    if (editingItem) {
      setOriginalEditingItem({ ...editingItem });
    }
  }, [editingItem]);


  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isEditing: boolean = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      toast({
        title: "Error",
        description: "Por favor, selecciona un archivo de imagen válido",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "La imagen no debe exceder los 5MB",
        variant: "destructive"
      });
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    if (isEditing && editingItem) {
      setEditingItem({
        ...editingItem,
        imageFile: file,
        image: previewUrl
      });
    } else {
      setNewItem({
        ...newItem,
        imageFile: file,
        image: previewUrl
      });
    }
  };

  const handleAddNew = async () => {
    if (!newItem.imageFile || !newItem.title || !newItem.description) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive"
      });
      return;
    }

    const formData = new FormData();
    formData.append('imageFile', newItem.imageFile);
    formData.append('title', newItem.title);
    formData.append('description', newItem.description);

    try {
      const response = await POST('/admin/carrusel', formData, true);

      if (response.ok) {
        const newItemData = await response.json();
        updateCarousel([...adminData.carousel, newItemData]);
        setNewItem({});
        setIsAddingNew(false);
        toast({
          title: "Elemento agregado",
          description: "Nueva imagen agregada al carrusel",
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al agregar elemento');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "No se pudo agregar el elemento al carrusel",
        variant: "destructive"
      });
    }
  };

  const handleUpdate = async () => {
    if (!editingItem) return;

    if (!hasChanges()) {
      toast({
        title: "Sin cambios",
        description: "No se detectaron cambios para guardar",
      });
      setEditingItem(null);
      return;
    }

    const formData = new FormData();
    if (editingItem.imageFile) {
      formData.append('imageFile', editingItem.imageFile);
    }
    formData.append('id', editingItem.id);
    formData.append('title', editingItem.title);
    formData.append('description', editingItem.description || '');

    try {
      const response = await PATCH('/admin/carrusel/update', formData, true);

      if (response.ok) {
        const updatedItem = await response.json();
        const updatedCarousel = adminData.carousel.map(item =>
          item.id === updatedItem.id ? updatedItem : item
        );
        updateCarousel(updatedCarousel);
        setEditingItem(null);
        toast({
          title: "Elemento actualizado",
          description: "La imagen del carrusel ha sido actualizada",
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al actualizar elemento');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "No se pudo actualizar el elemento del carrusel",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await DELETE(`/admin/carrusel/${id}`);

      if (response.ok) {
        const updatedCarousel = adminData.carousel.filter(item => item.id !== id);
        updateCarousel(updatedCarousel);
        toast({
          title: "Elemento eliminado",
          description: "La imagen ha sido removida del carrusel",
        });
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Error al eliminar elemento');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "No se pudo eliminar el elemento del carrusel",
        variant: "destructive"
      });
    }
  };

  const moveItem = async (id: string, direction: 'up' | 'down') => {
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

    newCarousel.forEach((item, index) => {
      item.order = index + 1;
    });

    updateCarousel(newCarousel);
    const itemsOrder = adminData.carousel.map(item => ({
      id: item.id,
      order: item.order
    }));

    const response = await PATCH('/admin/carrusel', itemsOrder);
    if (!response.ok) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el orden del carrusel",
        variant: "destructive"
      });
      return;
    }

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
              <label className="text-sm font-medium">Imagen *</label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => handleFileChange(e)}
                accept="image/*"
                className="hidden"
              />
              <Button
                variant="outline"
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>{newItem.image ? "Cambiar imagen" : "Seleccionar imagen"}</span>
              </Button>
              {newItem.image ? (
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground mb-2">Vista previa:</p>
                  <img
                    src={newItem.image}
                    alt="Preview"
                    className="max-h-40 rounded-md border"
                    onError={() => toast({
                      title: "Error",
                      description: "No se pudo cargar la vista previa de la imagen",
                      variant: "destructive"
                    })}
                  />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mt-2">No se ha seleccionado ninguna imagen</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Título *</label>
              <Input
                placeholder="Título principal de la imagen"
                value={newItem.title || ''}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Descripción *</label>
              <Textarea
                placeholder="Descripción que aparecerá debajo del título"
                value={newItem.description || ''}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
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
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden flex items-center justify-center">
                    {imageErrors[item.id] || !item.image ? (
                      <div className="flex flex-col items-center justify-center text-muted-foreground p-4">
                        <ImageOff className="w-8 h-8 mb-2" />
                        <p className="text-sm text-center">No se pudo cargar la imagen</p>
                      </div>
                    ) : (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(item.id)}
                      />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-2 space-y-4">
                  {editingItem?.id === item.id ? (
                    // Edit Mode
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Imagen</label>
                        <input
                          type="file"
                          ref={editFileInputRef}
                          onChange={(e) => handleFileChange(e, true)}
                          accept="image/*"
                          className="hidden"
                        />
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => editFileInputRef.current?.click()}
                          className="w-full flex items-center space-x-2"
                        >
                          <Upload className="w-4 h-4" />
                          <span>Cambiar imagen</span>
                        </Button>
                        {editingItem.image ? (
                          <div className="mt-2">
                            <p className="text-xs text-muted-foreground mb-2">Nueva vista previa:</p>
                            <img
                              src={editingItem.image}
                              alt="Preview"
                              className="max-h-40 rounded-md border"
                              onError={() => toast({
                                title: "Error",
                                description: "No se pudo cargar la vista previa de la imagen",
                                variant: "destructive"
                              })}
                            />
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground mt-2">La imagen actual se mantendrá</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Título</label>
                        <Input
                          value={editingItem.title}
                          onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Descripción</label>
                        <Textarea
                          value={editingItem.description || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                          rows={3}
                        />
                      </div>

                      <div className="flex space-x-2">
                        <Button onClick={handleUpdate} size="sm" className="flex items-center space-x-1">
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
                          onClick={() => setEditingItem({ ...item, imageFile: null })}
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

      {adminData.carousel.length === 0 && !isAddingNew && (
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