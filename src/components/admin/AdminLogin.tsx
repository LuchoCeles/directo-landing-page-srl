import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Truck, User } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAdmin();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular delay de autenticación
    await new Promise(resolve => setTimeout(resolve, 1500));

    const success = login(user,password);

    if (await success) {
      toast({
        title: "Acceso autorizado",
        description: "Bienvenido al panel administrativo",
      });
    } else {
      toast({
        title: "Acceso denegado",
        description: "Datos mal ingresados. Intente nuevamente.",
        variant: "destructive"
      });
    }

    setIsLoading(false);
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
            <Truck className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl">Panel Administrativo</CardTitle>
            <p className="text-muted-foreground mt-2">
              Transportadora El Directo SRL
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <div className="mb-6">
                <label className="text-sm font-medium text-foreground flex items-center space-x-2 mb-2">
                  <User className="w-4 h-4" />
                  <span>Usuario</span>
                </label>
                <Input
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="Ingrese el usuario"
                  className="border-border focus:ring-primary"
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground flex items-center space-x-2 mb-2">
                  <Lock className="w-4 h-4" />
                  <span>Contraseña</span>
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingrese la contraseña"
                  className="border-border focus:ring-primary"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full shadow-elegant hover:text-white hover:bg-color-blue"
              disabled={isLoading}
            >
              {isLoading ? "Verificando..." : "Iniciar Sesión"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Usuario:</strong> admin
            </p>
            <p className="text-sm text-muted-foreground text-center">
              <strong>Contraseña:</strong> admin123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;