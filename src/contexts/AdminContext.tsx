import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminData, CarouselItem, ContactInfo, Schedule, AboutContent } from '@/types/admin';
import { GET, POST } from '@/services/fetch';


interface AdminContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
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
    const token = localStorage.getItem('admin_token');
    loadInitialData();
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      const [carousel, contact, schedule, about] = await Promise.all([
        getCarouselItem(),
        getContact(),
        getSchedule(),
        getAbout()
      ]);
      
      setAdminData({ carousel, contact, schedule, about });

    } catch (error) {
      console.error("Error cargando datos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await POST('/admin/login', { username, password });

      if (!response.ok) return false;

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('admin_token', data.token);
        setIsAuthenticated(true);
        await loadInitialData();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('data_token');
    setAdminData(defaultAdminData);
    setIsAuthenticated(false);
  };

  const getCarouselItem = async (): Promise<CarouselItem[]> => {
    try {
      const response = await POST('/api/carrusel');
      if (!response.ok) return [];
      const data = await response.json();
      return Array.isArray(data) ? data : (data?.data || []);
    } catch (error) {
      console.error('Error cargando carrusel:', error);
      return [];
    }
  };

  const getAbout = async (): Promise<AboutContent> => {
    try {
      const response = await GET('/api/about');
      if (!response.ok) return defaultAdminData.about;
      return await response.json();
    } catch (error) {
      console.error('Error cargando about:', error);
      return defaultAdminData.about;
    }
  };

  const getSchedule = async (): Promise<Schedule[]> => {
    try {
      const response = await GET('/api/horarios');
      if (!response.ok) return [];
      const data = await response.json();
      return Array.isArray(data) ? data : (data?.data || []);
    } catch (error) {
      console.error('Error cargando horarios:', error);
      return [];
    }
  };

  const getContact = async (): Promise<ContactInfo[]> => {
    try {
      const response = await GET('/api/contacto');
      if (!response.ok) return [];
      const data = await response.json();
      return Array.isArray(data) ? data : (data?.data || []);
    } catch (error) {
      console.error('Error cargando contacto:', error);
      return [];
    }
  };

  const updateAdminData = (newData: Partial<AdminData>) => {
    const updatedData = { ...adminData, ...newData };
    setAdminData(updatedData);
    localStorage.setItem('data_token', JSON.stringify(updatedData));
  };

  const updateCarousel = (carousel: CarouselItem[]) => updateAdminData({ carousel });
  const updateContact = (contact: ContactInfo[]) => updateAdminData({ contact });
  const updateSchedule = (schedule: Schedule[]) => updateAdminData({ schedule });
  const updateAbout = (about: AboutContent) => updateAdminData({ about });

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      isLoading,
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
  if (!context) {
    throw new Error('useAdmin debe usarse dentro de AdminProvider');
  }
  return context;
};