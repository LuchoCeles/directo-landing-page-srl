import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminData, CarouselItem, ContactInfo, Schedule, AboutContent } from '@/types/admin';
import { GET, POST, PATCH, DELETE } from '@/services/fetch';

interface AdminContextType {
  isAuthenticated: boolean;
  adminData: AdminData;
  login: (user: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateCarousel: (carousel: CarouselItem[]) => void;
  updateContact: (contact: ContactInfo[]) => void;
  updateSchedule: (schedule: Schedule[]) => void;
  updateAbout: (about: AboutContent) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);


const defaultAdminData: AdminData = {
  carousel: [],
  contact: [],
  schedule: [],
  about: {
    id: "",
    content: ""
  }
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState<AdminData>(defaultAdminData);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (isAuthenticated) {
      const loadInitialData = async () => {
        try {
          setIsLoading(true);

          // Cargar todos los datos en paralelo
          const [carousel, contact, schedule, about] = await Promise.all([
            getCarouselItem(),
            getContact(),
            getSchedule(),
            getAbout()
          ]);

          setAdminData({
            carousel,
            contact,
            schedule,
            about
          });

        } catch (error) {
          console.error("Error cargando datos iniciales:", error);
          // Mantener los valores por defecto si hay error
        } finally {
          setIsLoading(false);
        }
      };

      loadInitialData();
      console.log('AdminProvider initialized', adminData);
    }
  }, [isAuthenticated]);


  useEffect(() => {
    // Verificar si está autenticado en localStorage
    const authStatus = localStorage.getItem('transportadora_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }

    // Cargar datos guardados
    const savedData = localStorage.getItem('transportadora_admin_data');
    if (savedData) {
      try {
        setAdminData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading admin data:', error);
      }
    }
  }, []);

  // Funciones de autenticación
  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await POST('/admin/login', { username, password });
      if (!response.ok) {
        return false;
      }
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('transportadora_admin_auth', data.token);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error durante el login:', error);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('transportadora_admin_auth');
  };

  // Funciones para obtener y actualizar datos
  const getCarouselItem = async (): Promise<CarouselItem[]> => {
    try {
      const response = await POST('/api/carrusel');
      if (!response.ok) {
        console.error('Error al cargar el carrusel:', response.status, response.statusText);
        return [];
      }
      const responseData = await response.json();
      if (!responseData) {
        console.warn('La respuesta está vacía');
        return [];
      }

      if (Array.isArray(responseData)) {
        return responseData as CarouselItem[];
      }
      if (responseData.data && Array.isArray(responseData.data)) {
        return responseData.data as CarouselItem[];
      }

      console.warn('Formato de respuesta inesperado:', responseData);
      return [];

    } catch (error) {
      console.error('Error cargando el carrusel:', error);
      return [];
    }
  }

  const getAbout = async (): Promise<AboutContent> => {
    try {
      const response = await GET('/api/about');
      if (!response.ok) {
        console.error('Error al cargar el horario:', response.statusText);
        return defaultAdminData.about;
      }
      const data = await response.json();
      return data as AboutContent;
    } catch (error) {
      console.error('Error cargando el horario:', error);
      return defaultAdminData.about;
    }
  }

  const getSchedule = async (): Promise<Schedule[]> => {
    try {
      const response = await GET('/api/horarios');
      if (!response.ok) {
        console.error('Error al cargar el horario:', response.status, response.statusText);
        return [];
      }

      const responseData = await response.json();
      if (!responseData) {
        console.warn('La respuesta está vacía');
        return [];
      }

      if (Array.isArray(responseData)) {
        return responseData as Schedule[];
      }

      if (responseData.data && Array.isArray(responseData.data)) {
        return responseData.data as Schedule[];
      }

      console.warn('Formato de respuesta inesperado:', responseData);
      return [];

    } catch (error) {
      console.error('Error cargando el horario:', error);
      return [];
    }
  };

  const getContact = async (): Promise<ContactInfo[]> => {
    try {
      const response = await GET('/api/contacto');
      if (!response.ok) {
        console.error('Error al cargar el contacto:', response.status, response.statusText);
        return [];
      }

      const responseData = await response.json();
      if (!responseData) {
        console.warn('La respuesta está vacía');
        return [];
      }

      if (Array.isArray(responseData)) {
        return responseData as ContactInfo[];
      }

      if (responseData.data && Array.isArray(responseData.data)) {
        return responseData.data as ContactInfo[];
      }

      console.warn('Formato de respuesta inesperado:', responseData);
      return [];

    } catch (error) {
      console.error('Error cargando el contacto:', error);
      return [];
    }
  };





  // Función para guardar los datos del administrador en el estado y localStorage
  const saveAdminData = (newData: AdminData) => {
    setAdminData(newData);
    localStorage.setItem('transportadora_admin_data', JSON.stringify(newData));
  };

  const updateCarousel = (carousel: CarouselItem[]) => {
    const newData = { ...adminData, carousel };
    saveAdminData(newData);
  };

  const updateContact = (contact: ContactInfo[]) => {
    const newData = { ...adminData, contact };
    saveAdminData(newData);
  };

  const updateSchedule = (schedule: Schedule[]) => {
    const newData = { ...adminData, schedule };
    saveAdminData(newData);
  };

  const updateAbout = (about: AboutContent) => {
    const newData = { ...adminData, about };
    saveAdminData(newData);
  };

  // Cargar datos iniciales
  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      adminData,
      login,
      logout,
      updateCarousel,
      updateContact,
      updateSchedule,
      updateAbout
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};