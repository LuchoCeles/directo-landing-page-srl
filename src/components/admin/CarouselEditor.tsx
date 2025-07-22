import { useState, useEffect } from 'react';
import { Upload, Trash2, Edit3, ArrowUp, ArrowDown, Link as LinkIcon, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface CarouselImage {
  id: string;
  url: string;
  title?: string;
  link?: string;
  order: number;
}

const CarouselEditor = () => {
  const [images, setImages] = useState<CarouselImage[]>([
    {
      id: '1',
      url: '/src/assets/hero-transport.jpg',
      title: 'Servicios de Transporte',
      link: '#servicios',
      order: 1
    },
    {
      id: '2', 
      url: '/placeholder.svg',
      title: 'Cobertura Nacional',
      link: '#sucursales',
      order: 2
    },
    {
      id: '3',
      url: '/placeholder.svg',
      title: 'Más de 30 años de experiencia',
      link: '#nosotros',
      order: 3
    }
  ]);

  const [editingImage, setEditingImage] = useState<CarouselImage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage: CarouselImage = {
          id: Date.now().toString(),
          url: event.target?.result as string,
          title: '',
          link: '',
          order: images.length + 1
        };
        setImages([...images, newImage]);
        toast({
          title: "Imagen agregada",
          description: "La imagen se ha subido correctamente",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageReplace = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages(images.map(img => 
          img.id === id 
            ? { ...img, url: event.target?.result as string }
            : img
        ));
        toast({
          title: "Imagen reemplazada",
          description: "La imagen se ha actualizado correctamente",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = (id: string) => {
    setImages(images.filter(img => img.id !== id));
    toast({
      title: "Imagen eliminada",
      description: "La imagen se ha eliminado correctamente",
    });
  };

  const handleMoveImage = (id: string, direction: 'up' | 'down') => {
    const currentIndex = images.findIndex(img => img.id === id);
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex >= 0 && newIndex < images.length) {
      const newImages = [...images];
      [newImages[currentIndex], newImages[newIndex]] = [newImages[newIndex], newImages[currentIndex]];
      
      // Actualizar el orden
      newImages.forEach((img, index) => {
        img.order = index + 1;
      });
      
      setImages(newImages);
      toast({
        title: "Orden actualizado",
        description: "El orden de las imágenes se ha modificado",
      });
    }
  };

  const handleEditImage = (image: CarouselImage) => {
    setEditingImage({ ...image });
    setIsDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingImage) {
      setImages(images.map(img => 
        img.id === editingImage.id ? editingImage : img
      ));
      setIsDialogOpen(false);
      setEditingImage(null);
      toast({
        title: "Cambios guardados",
        description: "Los datos de la imagen se han actualizado",
      });
    }
  };

  const CarouselPreview = () => (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Vista Previa del Carrusel</h3>
        <Button 
          variant="outline" 
          onClick={() => setPreviewMode(!previewMode)}
        >
          <Eye className="mr-2 h-4 w-4" />
          {previewMode ? 'Ocultar' : 'Mostrar'} Preview
        </Button>
      </div>
      
      {previewMode && (
        <div className="bg-muted p-4 rounded-lg">
          <div className="relative h-64 overflow-hidden rounded-lg">
            {images.length > 0 && (
              <div 
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(0%)` }}
              >
                {images.map((image) => (
                  <div key={image.id} className="min-w-full h-full relative">
                    <img 
                      src={image.url} 
                      alt={image.title || 'Imagen del carrusel'} 
                      className="w-full h-full object-cover"
                    />
                    {image.title && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
                        <h4 className="text-xl font-semibold">{image.title}</h4>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Editor de Carrusel</h1>
        <div className="flex gap-2">
          <Label htmlFor="upload-new" className="cursor-pointer">
            <Button asChild>
              <span>
                <Upload className="mr-2 h-4 w-4" />
                Agregar Imagen
              </span>
            </Button>
          </Label>
          <input
            id="upload-new"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>

      <CarouselPreview />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <Card key={image.id} className="shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">
                Imagen {index + 1}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video relative overflow-hidden rounded-lg bg-muted">
                <img 
                  src={image.url} 
                  alt={image.title || 'Imagen del carrusel'} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-2">
                <div>
                  <Label className="text-xs">Título</Label>
                  <p className="text-sm text-muted-foreground truncate">
                    {image.title || 'Sin título'}
                  </p>
                </div>
                {image.link && (
                  <div>
                    <Label className="text-xs">Enlace</Label>
                    <p className="text-sm text-muted-foreground truncate">
                      {image.link}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditImage(image)}
                >
                  <Edit3 className="h-3 w-3" />
                </Button>
                
                <Label htmlFor={`replace-${image.id}`} className="cursor-pointer">
                  <Button size="sm" variant="outline" asChild>
                    <span>
                      <Upload className="h-3 w-3" />
                    </span>
                  </Button>
                </Label>
                <input
                  id={`replace-${image.id}`}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageReplace(image.id, e)}
                />

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleMoveImage(image.id, 'up')}
                  disabled={index === 0}
                >
                  <ArrowUp className="h-3 w-3" />
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleMoveImage(image.id, 'down')}
                  disabled={index === images.length - 1}
                >
                  <ArrowDown className="h-3 w-3" />
                </Button>
                
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteImage(image.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog de edición */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Imagen</DialogTitle>
          </DialogHeader>
          {editingImage && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  value={editingImage.title || ''}
                  onChange={(e) => setEditingImage({
                    ...editingImage,
                    title: e.target.value
                  })}
                  placeholder="Título de la imagen"
                />
              </div>
              <div>
                <Label htmlFor="link">Enlace (opcional)</Label>
                <Input
                  id="link"
                  value={editingImage.link || ''}
                  onChange={(e) => setEditingImage({
                    ...editingImage,
                    link: e.target.value
                  })}
                  placeholder="#seccion o https://ejemplo.com"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={handleSaveEdit}>
                  Guardar Cambios
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CarouselEditor;