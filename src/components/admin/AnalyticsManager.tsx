import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GET, DELETE } from "../../services/fetch.js";
import {
  Users,
  Eye,
  Globe,
  Smartphone,
  Monitor,
  Clock,
  BarChart3,
  RefreshCw,
  AlertCircle
} from "lucide-react";

const AnalyticsManager = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Verificar estado de conexión al cargar el componente
  useEffect(() => {
    checkConnectionStatus();
  }, []);

  // Manejar el código de autenticación si está en la URL
  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      handleAuthCallback(code);
    }
  }, [searchParams]);

  const checkConnectionStatus = async () => {
    try {
      setLoading(true);
      // Verificar si estamos autenticados intentando obtener datos
      const response = await GET('/api/analytics/data');
      const result = await response.json();

      if (result.success) {
        setIsConnected(true);
        setAnalyticsData(result.analytics);
      } else {
        setIsConnected(false);
        if (result.error) setError(result.error);
      }
    } catch (error) {
      console.error('Error checking connection status:', error);
      setIsConnected(false);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectAnalytics = async () => {
    try {
      setLoading(true);
      // Obtener URL de autenticación
      const response = await GET('/api/analytics/auth-url');
      const result = await response.json();

      if (result.success && result.authUrl) {
        // Redirigir a la URL de autenticación de Google
        window.location.href = result.authUrl;
      } else {
        setError('Error al obtener URL de autenticación');
      }
    } catch (error) {
      console.error('Error getting auth URL:', error);
      setError('Error al conectar con Google Analytics');
    } finally {
      setLoading(false);
    }
  };

  const handleAuthCallback = async (code) => {
    try {
      setLoading(true);
      const response = await GET(`/api/analytics/callback?code=${code}`);
      const result = await response.json();

      if (result.success) {
        setIsConnected(true);
        // Obtener datos después de la autenticación exitosa
        await fetchAnalyticsData();
        // Limpiar parámetros de la URL
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete('code');
        setSearchParams(newSearchParams);
      } else {
        setError(result.error || 'Error en la autenticación con Google Analytics');
      }
    } catch (error) {
      console.error('Error handling auth callback:', error);
      setError('Error en el proceso de autenticación');
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalyticsData = async () => {
    try {
      setRefreshing(true);
      const response = await GET('/api/analytics/data');
      const result = await response.json();

      if (result.success) {
        setAnalyticsData(result.analytics);
        setError(null);
      } else {
        setIsConnected(false);
        setError(result.error || 'Error al obtener datos de Analytics');
      }
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      setError('Error al obtener los datos de Analytics');
    } finally {
      setRefreshing(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      setLoading(true);
      const response = await DELETE('/api/analytics/disconnect');
      const result = await response.json();

      if (result.success) {
        setIsConnected(false);
        setAnalyticsData(null);
      } else {
        setError(result.error || 'Error al desconectar Google Analytics');
      }
    } catch (error) {
      console.error('Error disconnecting analytics:', error);
      setError('Error al desconectar Google Analytics');
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('es-AR').format(num);
  };

  // Mostrar estado de carga
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2">Cargando...</span>
      </div>
    );
  }

  // Mostrar error si existe
  if (error) {
    return (
      <div className="space-y-6">
        <div className="bg-destructive/15 text-destructive p-4 rounded-md flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>{error}</span>
        </div>

        {isConnected ? (
          <Button onClick={fetchAnalyticsData} disabled={refreshing}>
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Reintentar
          </Button>
        ) : (
          <div className="flex items-center justify-center">
            <Button onClick={handleConnectAnalytics} disabled={loading}>
              <BarChart3 className="w-4 h-4" />
              <span> Conectar Analytics </span>
            </Button>
          </div>
        )}
      </div>
    );
  }

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
          <div className="flex justify-center">
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
          </div>
        </div>
      </div>
    );
  }

  // Datos por defecto en caso de que analyticsData sea null
  const data = analyticsData || {
    totalVisitors: 0,
    pageViews: 0,
    bounceRate: 0,
    avgSessionDuration: "0:00",
    topPages: [],
    deviceStats: { mobile: 0, desktop: 0, tablet: 0 },
    trafficSources: []
  };

  return (
    <div className="space-y-6">
      {/* Header con estado de conexión */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Métricas del Sitio Web</h3>
          <p className="text-sm text-muted-foreground">Últimos 30 días</p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Conectado
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDisconnect}
            disabled={loading}
          >
            Desconectar
          </Button>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <h4 className="font-semibold text-foreground">Visitantes</h4>
            <p className="text-2xl font-bold text-primary">{formatNumber(data.totalVisitors)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Eye className="w-8 h-8 text-primary mx-auto mb-2" />
            <h4 className="font-semibold text-foreground">Páginas Vistas</h4>
            <p className="text-2xl font-bold text-primary">{formatNumber(data.pageViews)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Globe className="w-8 h-8 text-primary mx-auto mb-2" />
            <h4 className="font-semibold text-foreground">Tasa de Rebote</h4>
            <p className="text-2xl font-bold text-primary">{data.bounceRate}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
            <h4 className="font-semibold text-foreground">Duración Promedio</h4>
            <p className="text-2xl font-bold text-primary">{data.avgSessionDuration}</p>
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
              {data.topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium truncate" title={page.path}>
                      {page.path}
                    </p>
                    <div className="w-full bg-muted rounded-full h-2 mt-1">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${page.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="ml-4 text-right min-w-[60px]">
                    <p className="text-sm font-semibold">{formatNumber(page.views)}</p>
                    <p className="text-xs text-muted-foreground">{page.percentage.toFixed(1)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dispositivos y fuentes de tráfico */}
        <div className="space-y-6">
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
                        style={{ width: `${data.deviceStats.mobile}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold w-12 text-right">
                      {data.deviceStats.mobile.toFixed(1)}%
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
                        style={{ width: `${data.deviceStats.desktop}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold w-12 text-right">
                      {data.deviceStats.desktop.toFixed(1)}%
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
                        style={{ width: `${data.deviceStats.tablet}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold w-12 text-right">
                      {data.deviceStats.tablet.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fuentes de Tráfico</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.trafficSources.map((source, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{source.source}</span>
                    <span className="text-sm font-medium">{source.percentage.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Acción para refrescar datos */}
      <div className="flex justify-center pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={fetchAnalyticsData}
          disabled={refreshing}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Actualizar Datos
        </Button>
      </div>
    </div>
  );
};

export default AnalyticsManager;