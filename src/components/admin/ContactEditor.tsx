import { useState } from 'react';
import { Save, Plus, Trash2, Phone, Mail, MapPin, Clock, Instagram, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface ContactData {
  phones: string[];
  emails: string[];
  addresses: string[];
  schedules: {
    location: string;
    weekdays: string;
    saturday: string;
    sunday: string;
  }[];
  socialLinks: {
    whatsapp: string;
    instagram: string;
    facebook: string;
  };
}

const ContactEditor = () => {
  const [contactData, setContactData] = useState<ContactData>({
    phones: ['+54 341 439-7465', '+54 223 477-1190'],
    emails: ['eldirecto@live.com.ar'],
    addresses: [
      'Sucursal Rosario - Dirección disponible en sucursal',
      'Sucursal Mar del Plata - Dirección disponible en sucursal'
    ],
    schedules: [
      {
        location: 'Rosario',
        weekdays: 'Lunes a Viernes: 7:30 – 15:30',
        saturday: 'Sábados: 7:30 – 11:00',
        sunday: 'Domingos: Cerrado'
      },
      {
        location: 'Mar del Plata',
        weekdays: 'Lunes a Viernes: 08:00 – 16:00',
        saturday: 'Sábados: 08:00 – 12:00',
        sunday: 'Domingos: Cerrado'
      }
    ],
    socialLinks: {
      whatsapp: 'https://wa.me/5493414397465',
      instagram: '',
      facebook: ''
    }
  });

  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\+?[\d\s\-\(\)]+$/.test(phone.trim());
  };

  const validateUrl = (url: string) => {
    if (!url) return true; // URLs vacías son válidas
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSave = () => {
    // Validaciones
    const invalidEmails = contactData.emails.filter(email => email && !validateEmail(email));
    const invalidPhones = contactData.phones.filter(phone => phone && !validatePhone(phone));
    
    if (invalidEmails.length > 0) {
      toast({
        title: "Error de validación",
        description: "Algunos emails no tienen un formato válido",
        variant: "destructive"
      });
      return;
    }

    if (invalidPhones.length > 0) {
      toast({
        title: "Error de validación", 
        description: "Algunos teléfonos no tienen un formato válido",
        variant: "destructive"
      });
      return;
    }

    if (!validateUrl(contactData.socialLinks.whatsapp) || 
        !validateUrl(contactData.socialLinks.instagram) || 
        !validateUrl(contactData.socialLinks.facebook)) {
      toast({
        title: "Error de validación",
        description: "Algunos enlaces de redes sociales no son válidos",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);

    // Simular guardado
    setTimeout(() => {
      localStorage.setItem('contact_data', JSON.stringify(contactData));
      setIsSaving(false);
      toast({
        title: "Datos guardados",
        description: "Los datos de contacto se han actualizado correctamente",
      });
    }, 1000);
  };

  const addField = (field: 'phones' | 'emails' | 'addresses') => {
    setContactData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeField = (field: 'phones' | 'emails' | 'addresses', index: number) => {
    setContactData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateField = (field: 'phones' | 'emails' | 'addresses', index: number, value: string) => {
    setContactData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const updateSchedule = (index: number, field: string, value: string) => {
    setContactData(prev => ({
      ...prev,
      schedules: prev.schedules.map((schedule, i) => 
        i === index ? { ...schedule, [field]: value } : schedule
      )
    }));
  };

  const updateSocialLink = (platform: keyof ContactData['socialLinks'], value: string) => {
    setContactData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Editor de Datos de Contacto</h1>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? 'Guardando...' : 'Guardar Cambios'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Teléfonos */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="mr-2 h-5 w-5 text-primary" />
              Teléfonos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {contactData.phones.map((phone, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={phone}
                  onChange={(e) => updateField('phones', index, e.target.value)}
                  placeholder="+54 xxx xxx-xxxx"
                  className={!validatePhone(phone) && phone ? 'border-destructive' : ''}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeField('phones', index)}
                  disabled={contactData.phones.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => addField('phones')}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Agregar Teléfono
            </Button>
          </CardContent>
        </Card>

        {/* Emails */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="mr-2 h-5 w-5 text-primary" />
              Correos Electrónicos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {contactData.emails.map((email, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={email}
                  onChange={(e) => updateField('emails', index, e.target.value)}
                  placeholder="contacto@ejemplo.com"
                  type="email"
                  className={!validateEmail(email) && email ? 'border-destructive' : ''}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeField('emails', index)}
                  disabled={contactData.emails.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => addField('emails')}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Agregar Email
            </Button>
          </CardContent>
        </Card>

        {/* Direcciones */}
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-primary" />
              Direcciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {contactData.addresses.map((address, index) => (
              <div key={index} className="flex gap-2">
                <Textarea
                  value={address}
                  onChange={(e) => updateField('addresses', index, e.target.value)}
                  placeholder="Dirección completa de la sucursal"
                  className="min-h-[80px]"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeField('addresses', index)}
                  disabled={contactData.addresses.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => addField('addresses')}
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Agregar Dirección
            </Button>
          </CardContent>
        </Card>

        {/* Horarios */}
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-primary" />
              Horarios de Atención
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {contactData.schedules.map((schedule, index) => (
              <div key={index} className="space-y-3 p-4 border border-border rounded-lg">
                <div>
                  <Label>Sucursal</Label>
                  <Input
                    value={schedule.location}
                    onChange={(e) => updateSchedule(index, 'location', e.target.value)}
                    placeholder="Nombre de la sucursal"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <Label>Lunes a Viernes</Label>
                    <Input
                      value={schedule.weekdays}
                      onChange={(e) => updateSchedule(index, 'weekdays', e.target.value)}
                      placeholder="08:00 - 17:00"
                    />
                  </div>
                  <div>
                    <Label>Sábados</Label>
                    <Input
                      value={schedule.saturday}
                      onChange={(e) => updateSchedule(index, 'saturday', e.target.value)}
                      placeholder="08:00 - 12:00"
                    />
                  </div>
                  <div>
                    <Label>Domingos</Label>
                    <Input
                      value={schedule.sunday}
                      onChange={(e) => updateSchedule(index, 'sunday', e.target.value)}
                      placeholder="Cerrado"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Redes Sociales */}
        <Card className="shadow-card lg:col-span-2">
          <CardHeader>
            <CardTitle>Enlaces de Redes Sociales</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="flex items-center">
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </Label>
              <Input
                value={contactData.socialLinks.whatsapp}
                onChange={(e) => updateSocialLink('whatsapp', e.target.value)}
                placeholder="https://wa.me/5493414397465"
                className={!validateUrl(contactData.socialLinks.whatsapp) ? 'border-destructive' : ''}
              />
            </div>
            <div>
              <Label className="flex items-center">
                <Instagram className="mr-2 h-4 w-4" />
                Instagram
              </Label>
              <Input
                value={contactData.socialLinks.instagram}
                onChange={(e) => updateSocialLink('instagram', e.target.value)}
                placeholder="https://instagram.com/usuario"
                className={!validateUrl(contactData.socialLinks.instagram) ? 'border-destructive' : ''}
              />
            </div>
            <div>
              <Label className="flex items-center">
                📘 Facebook
              </Label>
              <Input
                value={contactData.socialLinks.facebook}
                onChange={(e) => updateSocialLink('facebook', e.target.value)}
                placeholder="https://facebook.com/pagina"
                className={!validateUrl(contactData.socialLinks.facebook) ? 'border-destructive' : ''}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactEditor;