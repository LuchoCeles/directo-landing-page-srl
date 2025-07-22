import { useState } from 'react';
import { LogOut, Image, Phone, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeSection: 'carousel' | 'contact';
  onSectionChange: (section: 'carousel' | 'contact') => void;
  onLogout: () => void;
}

const AdminLayout = ({ children, activeSection, onSectionChange, onLogout }: AdminLayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'carousel', label: 'Carrusel', icon: Image },
    { id: 'contact', label: 'Datos de Contacto', icon: Phone },
  ];

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    onLogout();
  };

  const NavigationContent = () => (
    <div className="space-y-2">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <Button
            key={item.id}
            variant={activeSection === item.id ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => {
              onSectionChange(item.id as 'carousel' | 'contact');
              setIsMobileMenuOpen(false);
            }}
          >
            <Icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        );
      })}
      <div className="pt-4 border-t border-border">
        <Button
          variant="outline"
          className="w-full justify-start text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header móvil */}
      <div className="lg:hidden bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-primary">Panel Admin</h1>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="py-4">
                <h2 className="text-lg font-semibold mb-4 text-primary">
                  Transporte El Directo
                </h2>
                <NavigationContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar desktop */}
        <div className="hidden lg:block w-64 bg-card border-r border-border">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-6 text-primary">
              Panel de Administración
            </h2>
            <NavigationContent />
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1 p-4 lg:p-6">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;