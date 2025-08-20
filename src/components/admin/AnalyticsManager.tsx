import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Eye, 
  TrendingUp, 
  Globe, 
  Smartphone, 
  Monitor,
  Clock,
  BarChart3,
  RefreshCw
} from "lucide-react";

const AnalyticsManager = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);

  // Datos de ejemplo para mostrar la estructura
  const mockData = {
    totalVisitors: 1247,
    pageViews: 3521,
    bounceRate: 45.2,
    avgSessionDuration: "2:34",
    topPages: [
      { path: "/", views: 1856, percentage: 52.7 },
      { path: "/#sobre-nosotros", views: 687, percentage: 19.5 },
      { path: "/#contacto", views: 423, percentage: 12.0 },
      { path: "/#horarios", views: 312, percentage: 8.9 },
      { path: "/#sucursales", views: 243, percentage: 6.9 }
    ],
    deviceStats: {
      mobile: 68.4,
      desktop: 28.1,
      tablet: 3.5
    },
    trafficSources: [
      { source: "Búsqueda orgánica", percentage: 42.3 },
      { source: "Directo", percentage: 31.8 },
      { source: "Redes sociales", percentage: 15.2 },
      { source: "Referencias", percentage: 10.7 }
    ]
  };

  const handleConnectAnalytics = () => {
    setLoading(true);
    // Simular conexión
    setTimeout(() => {
      setIsConnected(true);
      setLoading(false);
    }, 2000);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-AR').format(num);
  };

  if (!isConnected) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Conectar Google Analytics</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Para ver las métricas de visitantes y comportamiento de tu sitio web, 
            necesitas conectar tu cuenta de Google Analytics.
          </p>
          <Button 
            onClick={handleConnectAnalytics}
            disabled={loading}
            className="flex items-center space-x-2"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <BarChart3 className="w-4 h-4" />
            )}
            <span>{loading ? 'Conectando...' : 'Conectar Analytics'}</span>
          </Button>
          
          <div className="mt-8 p-4 bg-muted/50 rounded-lg max-w-md mx-auto">
            <p className="text-sm text-muted-foreground">
              💡 <strong>Nota:</strong> Para obtener datos reales, necesitarás configurar 
              la integración con Google Analytics a través de Supabase para manejar 
              las credenciales de forma segura.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con estado de conexión */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Métricas del Sitio Web</h3>
          <p className="text-sm text-muted-foreground">Últimos 30 días</p>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          Conectado
        </Badge>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <h4 className="font-semibold text-foreground">Visitantes</h4>
            <p className="text-2xl font-bold text-primary">{formatNumber(mockData.totalVisitors)}</p>
            <p className="text-sm text-green-600 flex items-center justify-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12.5%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Eye className="w-8 h-8 text-primary mx-auto mb-2" />
            <h4 className="font-semibold text-foreground">Páginas Vistas</h4>
            <p className="text-2xl font-bold text-primary">{formatNumber(mockData.pageViews)}</p>
            <p className="text-sm text-green-600 flex items-center justify-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8.2%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Globe className="w-8 h-8 text-primary mx-auto mb-2" />
            <h4 className="font-semibold text-foreground">Tasa de Rebote</h4>
            <p className="text-2xl font-bold text-primary">{mockData.bounceRate}%</p>
            <p className="text-sm text-red-600 flex items-center justify-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1 rotate-180" />
              +2.1%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
            <h4 className="font-semibold text-foreground">Duración Promedio</h4>
            <p className="text-2xl font-bold text-primary">{mockData.avgSessionDuration}</p>
            <p className="text-sm text-green-600 flex items-center justify-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +5.7%
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Páginas más visitadas */}
        <Card>
          <CardHeader>
            <CardTitle>Páginas Más Visitadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{page.path}</p>
                    <div className="w-full bg-muted rounded-full h-2 mt-1">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${page.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm font-semibold">{formatNumber(page.views)}</p>
                    <p className="text-xs text-muted-foreground">{page.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dispositivos */}
        <Card>
          <CardHeader>
            <CardTitle>Dispositivos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Smartphone className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Móvil</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${mockData.deviceStats.mobile}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold w-12 text-right">
                    {mockData.deviceStats.mobile}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Monitor className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Escritorio</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${mockData.deviceStats.desktop}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold w-12 text-right">
                    {mockData.deviceStats.desktop}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Tablet</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${mockData.deviceStats.tablet}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold w-12 text-right">
                    {mockData.deviceStats.tablet}%
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <h4 className="text-sm font-medium mb-3">Fuentes de Tráfico</h4>
              <div className="space-y-2">
                {mockData.trafficSources.map((source, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{source.source}</span>
                    <span className="font-medium">{source.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Acción para refrescar datos */}
      <div className="flex justify-center pt-4">
        <Button variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Actualizar Datos
        </Button>
      </div>
    </div>
  );
};

export default AnalyticsManager;