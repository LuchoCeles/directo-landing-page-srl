import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "", company: "", email: "", phone: "", message: ""
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const val = name === 'phone' ? value.replace(/[^\d+ ]/g, '') : value;
    setFormData(prev => ({ ...prev, [name]: val }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = "Nombre es requerido";
    if (!formData.email.trim()) newErrors.email = "Email es requerido";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Email no válido";
    if (!formData.message.trim()) newErrors.message = "Mensaje es requerido";
    if (formData.phone && !/^[\d+][\d ]+$/.test(formData.phone)) newErrors.phone = "Teléfono no válido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const subject = encodeURIComponent(`Consulta de ${formData.name}`);
    const body = encodeURIComponent(
      `Nombre: ${formData.name}\nEmpresa: ${formData.company}\nTeléfono: ${formData.phone}\n\n${formData.message}`
    );
    window.location.href = `mailto:contacto@transporte-srl.com?subject=${subject}&body=${body}`;

    toast({
      title: "Redirigiendo a su cliente de correo",
      description: "Se abrirá su aplicación de correo para enviar el mensaje.",
    });

    setFormData({ name: "", company: "", email: "", phone: "", message: "" });
  };

  return (
    <div>
      <Card className="shadow-card-custom">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground">Envíanos un Mensaje</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Nombre *</label>
                <Input name="name" value={formData.name} onChange={handleChange} placeholder="Su nombre completo" className="border-border focus:ring-primary" />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Empresa</label>
                <Input name="company" value={formData.company} onChange={handleChange} placeholder="Nombre de la empresa" className="border-border focus:ring-primary" />
              </div>
            </div>
            <div className="space-y-2 mt-2">
              <label className="text-sm font-medium text-foreground">Email *</label>
              <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="correo@empresa.com" className="border-border focus:ring-primary" />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
            <div className="space-y-2 mt-2">
              <label className="text-sm font-medium text-foreground">Teléfono</label>
              <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+54 XXX XXX-XXXX" className="border-border focus:ring-primary" inputMode="numeric" />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>
            <div className="space-y-2 mt-2">
              <label className="text-sm font-medium text-foreground">Mensaje *</label>
              <Textarea name="message" value={formData.message} onChange={handleChange} placeholder="Describa su consulta o requerimiento..." rows={5} className="border-border focus:ring-primary resize-none" />
              {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
            </div>
            <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 shadow-elegant mt-4">
              Enviar Mensaje
            </Button>
            <p className="text-xs text-muted-foreground mt-4">* Campos obligatorios.</p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;
