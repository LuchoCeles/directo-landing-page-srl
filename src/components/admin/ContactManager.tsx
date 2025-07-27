import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Edit, Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { ContactInfo } from "@/types/admin";
import { useToast } from "@/hooks/use-toast";

const ContactManager = () => {
  const { adminData, updateContact } = useAdmin();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editContact, setEditContact] = useState<ContactInfo>(adminData.contact);

  const handleSave = () => {
    updateContact(editContact);
    setIsEditing(false);
    toast({
      title: "Información de contacto actualizada",
      description: "Los datos de contacto han sido guardados correctamente",
    });
  };

  const handleCancel = () => {
    setEditContact(adminData.contact);
    setIsEditing(false);
  };

  const updateField = (field: keyof ContactInfo, value: string) => {
    setEditContact({
      ...editContact,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Gestión de Contacto</h3>
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
              <span>Editar Información</span>
            </>
          )}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Teléfonos */}
        <Card className="shadow-card-custom">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-primary" />
              <span>Teléfonos</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">📍 Rosario</label>
                  <Input
                    value={editContact.rosarioPhone}
                    onChange={(e) => updateField('rosarioPhone', e.target.value)}
                    placeholder="+54 341 439‑7465"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">📍 Mar del Plata</label>
                  <Input
                    value={editContact.marDelPlataPhone}
                    onChange={(e) => updateField('marDelPlataPhone', e.target.value)}
                    placeholder="+54 223 477‑1190"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="font-medium">📍 Rosario</span>
                  <span className="text-primary font-semibold">{adminData.contact.rosarioPhone}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="font-medium">📍 Mar del Plata</span>
                  <span className="text-primary font-semibold">{adminData.contact.marDelPlataPhone}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Email y WhatsApp */}
        <Card className="shadow-card-custom">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="w-5 h-5 text-primary" />
              <span>Email y WhatsApp</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </label>
                  <Input
                    type="email"
                    value={editContact.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="eldirecto@live.com.ar"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </label>
                  <Input
                    value={editContact.whatsapp}
                    onChange={(e) => updateField('whatsapp', e.target.value)}
                    placeholder="+543414397465"
                  />
                  <p className="text-xs text-muted-foreground">
                    Formato: +54 seguido del número sin espacios
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="font-medium flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </span>
                  <span className="text-primary font-semibold">{adminData.contact.email}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="font-medium flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </span>
                  <span className="text-primary font-semibold">{adminData.contact.whatsapp}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Direcciones */}
      <Card className="shadow-card-custom">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span>Direcciones</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">📍 Dirección Rosario</label>
                <Textarea
                  value={editContact.rosarioAddress}
                  onChange={(e) => updateField('rosarioAddress', e.target.value)}
                  placeholder="Dirección completa de la sucursal Rosario"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">📍 Dirección Mar del Plata</label>
                <Textarea
                  value={editContact.marDelPlataAddress}
                  onChange={(e) => updateField('marDelPlataAddress', e.target.value)}
                  placeholder="Dirección completa de la sucursal Mar del Plata"
                  rows={3}
                />
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">📍 Rosario</h4>
                <p className="text-muted-foreground">{adminData.contact.rosarioAddress}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">📍 Mar del Plata</h4>
                <p className="text-muted-foreground">{adminData.contact.marDelPlataAddress}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Recomendaciones</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700">
          <ul className="space-y-2 text-sm">
            <li>• Use formato internacional para teléfonos: +54 seguido del número</li>
            <li>• El WhatsApp debe incluir código de país sin espacios para funcionar correctamente</li>
            <li>• Las direcciones deben ser completas (calle, número, código postal, ciudad)</li>
            <li>• Verifique que el email sea válido y esté activo</li>
            <li>• Mantenga coherencia en el formato entre ambas sucursales</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactManager;