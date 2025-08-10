import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save, Edit, Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";
import { ContactInfo } from "@/types/admin";
import { PATCH } from "../../services/fetch.js"


const ContactManager = () => {
  const { adminData, updateContact } = useAdmin();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editContacts, setEditContacts] = useState<ContactInfo[]>(adminData.contact);
  const [originalContacts, setOriginalContacts] = useState<ContactInfo[]>(adminData.contact);

  const hasChanges = () => {
    if (originalContacts.length !== editContacts.length) return true;

    return editContacts.some((contact, index) => {
      const originalContact = originalContacts[index];
      return (
        contact.telefono !== originalContact.telefono ||
        contact.email !== originalContact.email ||
        contact.whatsapp !== originalContact.whatsapp ||
        contact.address !== originalContact.address
      );
    });
  };

  const getModifiedContacts = () => {
    return editContacts.filter((contact, index) => {
      const originalContact = originalContacts[index];
      return (
        contact.telefono !== originalContact.telefono ||
        contact.email !== originalContact.email ||
        contact.whatsapp !== originalContact.whatsapp ||
        contact.address !== originalContact.address
      );
    });
  };

  const handleSave = async () => {
    if (!hasChanges()) {
      toast({
        title: "Sin cambios",
        description: "No se detectaron cambios para guardar",
      });
      setIsEditing(false);
      return;
    }

    try {
      const modifiedContacts = getModifiedContacts();

      const response = await PATCH("/admin/contacto", modifiedContacts);
      
      if (response.ok) {
        updateContact(editContacts);
        setOriginalContacts(editContacts);
        setIsEditing(false);
        toast({
          title: "Información de contacto actualizada",
          description: "Los datos de contacto han sido guardados correctamente",
        });
      } else {
        toast({
          title: "Error",
          description: "No se pudo actualizar la información de contacto",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Error al cargar los datos. ${error}`,
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setEditContacts(adminData.contact || []);
    setIsEditing(false);
  };

  const updateField = (id: string, field: keyof ContactInfo, value: string) => {
    setEditContacts(prev =>
      prev.map(contact =>
        contact.id === id ? { ...contact, [field]: value } : contact
      )
    );
  };

  if (!adminData.contact || adminData.contact.length === 0) {
    return <div>No hay datos de contacto disponibles</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Gestión de Contacto</h3>
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2"
          >
            <Edit className="w-4 h-4" />
            <span>Editar Información</span>
          </Button>
        ) : (
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {editContacts.map((contact) => (
          <Card key={contact.id} className="shadow-card-custom">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-primary" />
                <span>📍 {contact.sucursal}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center space-x-1">
                      <Phone className="w-4 h-4" />
                      <span>Teléfono</span>
                    </label>
                    <Input
                      value={contact.telefono || ''}
                      onChange={(e) => updateField(contact.id, 'telefono', e.target.value)}
                      placeholder="+54 341 1234567"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center space-x-1">
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </label>
                    <Input
                      type="email"
                      value={contact.email || ''}
                      onChange={(e) => updateField(contact.id, 'email', e.target.value)}
                      placeholder="sucursal@transporte.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center space-x-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </label>
                    <Input
                      value={contact.whatsapp || ''}
                      onChange={(e) => updateField(contact.id, 'whatsapp', e.target.value)}
                      placeholder="+54123123123"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Dirección</label>
                    <Textarea
                      value={contact.address || ''}
                      onChange={(e) => updateField(contact.id, 'address', e.target.value)}
                      placeholder="Calle, número, ciudad"
                      rows={3}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="font-medium flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>Teléfono</span>
                    </span>
                    <span className="text-primary font-semibold">{contact.telefono}</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="font-medium flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </span>
                    <span className="text-primary font-semibold">{contact.email}</span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="font-medium flex items-center space-x-2">
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </span>
                    <span className="text-primary font-semibold">{contact.whatsapp}</span>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h4 className="font-medium flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>Dirección</span>
                    </h4>
                    <p className="text-muted-foreground">{contact.address}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
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

      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Recomendaciones</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-700">
          <ul className="space-y-2 text-sm">
            <li>• Use formato internacional para teléfonos: +54 seguido del número</li>
            <li>• El WhatsApp debe incluir código de país sin espacios</li>
            <li>• Las direcciones deben ser completas (calle, número, ciudad)</li>
            <li>• Verifique que los emails sean válidos</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactManager;