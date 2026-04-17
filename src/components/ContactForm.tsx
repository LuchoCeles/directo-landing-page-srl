import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
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

const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;

const ContactForm = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "", company: "", email: "", phone: "", message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSending, setIsSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const val = name === "phone" ? value.replace(/[^\d+ ]/g, "") : value;
    // Map input name back to formData key
    const key = name === "from_name" ? "name" : name === "reply_to" ? "email" : name;
    setFormData((prev) => ({ ...prev, [key]: val }));
    if (errors[key as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim())    newErrors.name    = "Nombre es requerido";
    if (!formData.email.trim())   newErrors.email   = "Email es requerido";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
                                  newErrors.email   = "Email no válido";
    if (!formData.message.trim()) newErrors.message = "Mensaje es requerido";
    if (formData.phone && !/^[\d+][\d ]+$/.test(formData.phone))
                                  newErrors.phone   = "Teléfono no válido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !formRef.current) return;

    setIsSending(true);
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      toast({
        title: "Mensaje enviado",
        description: "Nos pondremos en contacto a la brevedad. ¡Gracias!",
      });

      setFormData({ name: "", company: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({
        title: "Error al enviar",
        description:
          "No se pudo enviar el mensaje. Por favor intente nuevamente o contáctenos por teléfono.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <Card className="shadow-card-custom">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground">
            Envíanos un Mensaje
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/*
            ref={formRef} → emailjs.sendForm lee los inputs por su atributo `name`.
            Los nombres deben coincidir con las variables del template en EmailJS:
              from_name → {{from_name}}
              company   → {{company}}
              reply_to  → {{reply_to}}  (EmailJS usa reply_to para el "Reply-To" del email)
              phone     → {{phone}}
              message   → {{message}}
          */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Nombre *
                </label>
                <Input
                  name="from_name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Su nombre completo"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Empresa
                </label>
                <Input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Nombre de la empresa"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email *
              </label>
              <Input
                name="reply_to"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="correo@empresa.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Teléfono
              </label>
              <Input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+54 XXX XXX-XXXX"
                inputMode="numeric"
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Mensaje *
              </label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describa su consulta o requerimiento..."
                rows={5}
                className="resize-none"
              />
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message}</p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 shadow-elegant"
              disabled={isSending}
            >
              {isSending ? "Enviando..." : "Enviar Mensaje"}
            </Button>

            <p className="text-xs text-muted-foreground">
              * Campos obligatorios.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;