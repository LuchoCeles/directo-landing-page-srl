import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Settings, Image, Info, Clock, Phone } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import CarouselManager from "./CarouselManager";
import AboutManager from "./AboutManager";
import ContactManager from "./ContactManager";
import ScheduleManager from "./ScheduleManager";

const AdminDashboard = () => {
  const { logout, adminData } = useAdmin();
  const [activeTab, setActiveTab] = useState("carousel");

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-background border-b border-border shadow-card-custom">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Panel Administrativo</h1>
              <p className="text-muted-foreground">Transportadora El Directo SRL</p>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-card-custom">
            <CardContent className="p-6 text-center">
              <Image className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-foreground">Carrusel</h3>
              <p className="text-2xl font-bold text-primary">{adminData.carousel.length}</p>
              <p className="text-sm text-muted-foreground">imágenes</p>
            </CardContent>
          </Card>

          <Card className="shadow-card-custom">
            <CardContent className="p-6 text-center">
              <Info className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-foreground">Contenido</h3>
              <p className="text-2xl font-bold text-primary">✓</p>
              <p className="text-sm text-muted-foreground">actualizado</p>
            </CardContent>
          </Card>

          <Card className="shadow-card-custom">
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-foreground">Horarios</h3>
              <p className="text-2xl font-bold text-primary">2</p>
              <p className="text-sm text-muted-foreground">sucursales</p>
            </CardContent>
          </Card>

          <Card className="shadow-card-custom">
            <CardContent className="p-6 text-center">
              <Phone className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="font-semibold text-foreground">Contacto</h3>
              <p className="text-2xl font-bold text-primary">✓</p>
              <p className="text-sm text-muted-foreground">configurado</p>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Gestión de Contenido</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="carousel" className="flex items-center space-x-2">
                  <Image className="w-4 h-4" />
                  <span>Carrusel</span>
                </TabsTrigger>
                <TabsTrigger value="about" className="flex items-center space-x-2">
                  <Info className="w-4 h-4" />
                  <span>Sobre Nosotros</span>
                </TabsTrigger>
                <TabsTrigger value="schedule" className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Horarios</span>
                </TabsTrigger>
                <TabsTrigger value="contact" className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Contacto</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="carousel" className="mt-6">
                <CarouselManager />
              </TabsContent>

              <TabsContent value="about" className="mt-6">
                <AboutManager />
              </TabsContent>

              <TabsContent value="schedule" className="mt-6">
                <ScheduleManager />
              </TabsContent>

              <TabsContent value="contact" className="mt-6">
                <ContactManager />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;