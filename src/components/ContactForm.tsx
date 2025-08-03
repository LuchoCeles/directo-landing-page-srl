import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { POST } from "../services/fetch.js";
import { Mail } from "@/types/admin.js";

// Constante para el cooldown (5 minutos en milisegundos)
const COOLDOWN_TIME = 5 * 60 * 1000;

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Mail>({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Mail>>({});
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // Efecto para manejar el contador regresivo
  useEffect(() => {
    if (!lastSubmissionTime) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = now - lastSubmissionTime;
      const remaining = COOLDOWN_TIME - elapsed;

      if (remaining <= 0) {
        setTimeLeft(0);
        clearInterval(interval);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastSubmissionTime]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name as keyof Mail]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Partial<Mail> = {};
    if (!formData.name.trim()) newErrors.name = "Nombre es requerido";
    if (!formData.email.trim()) {
      newErrors.email = "Email es requerido";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email no válido";
    }
    if (!formData.message.trim()) newErrors.message = "Mensaje es requerido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Verificar cooldown
    const now = Date.now();
    if (lastSubmissionTime && (now - lastSubmissionTime) < COOLDOWN_TIME) {
      toast({
        title: "Espere un momento",
        description: `Por favor espere ${Math.ceil(timeLeft / 1000 / 60)} minutos antes de enviar otro mensaje.`,
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await POST("/api/mail", formData);

      if (response.ok) {
        toast({
          title: "Mensaje enviado",
          description: "Tu consulta ha sido enviada correctamente. Nos pondremos en contacto pronto.",
        });

        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          message: ""
        });
        
        // Establecer el tiempo del último envío
        setLastSubmissionTime(Date.now());
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error al enviar el mensaje");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Ocurrió un error al enviar el formulario",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Función para formatear el tiempo restante
  const formatTimeLeft = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div>
      <Card className="shadow-card-custom">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground">
            Envíanos un Mensaje
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Nombre *
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Su nombre completo"
                  className="border-border focus:ring-primary"
                  disabled={isSubmitting || timeLeft > 0}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
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
                  className="border-border focus:ring-primary"
                  disabled={isSubmitting || timeLeft > 0}
                />
              </div>
            </div>

            <div className="space-y-2 mt-2">
              <label className="text-sm font-medium text-foreground">
                Email *
              </label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="correo@empresa.com"
                className="border-border focus:ring-primary"
                disabled={isSubmitting || timeLeft > 0}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>

            <div className="space-y-2 mt-2">
              <label className="text-sm font-medium text-foreground">
                Teléfono
              </label>
              <Input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+54 XXX XXX-XXXX"
                className="border-border focus:ring-primary"
                disabled={isSubmitting || timeLeft > 0}
              />
            </div>

            <div className="space-y-2 mt-2">
              <label className="text-sm font-medium text-foreground">
                Mensaje *
              </label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describa su consulta o requerimiento..."
                rows={5}
                className="border-border focus:ring-primary resize-none"
                disabled={isSubmitting || timeLeft > 0}
              />
              {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 shadow-elegant mt-4"
              disabled={isSubmitting || timeLeft > 0}
            >
              {timeLeft > 0 ? `Espere ${formatTimeLeft(timeLeft)}` : 
               isSubmitting ? "Enviando..." : "Enviar Mensaje"}
            </Button>

            {timeLeft > 0 && (
              <p className="text-sm text-muted-foreground mt-2 text-center">
                Para prevenir spam, puedes enviar otro mensaje en {formatTimeLeft(timeLeft)}
              </p>
            )}

            <p className="text-xs text-muted-foreground mt-4">
              * Campos obligatorios. Sus datos serán tratados de forma confidencial.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;