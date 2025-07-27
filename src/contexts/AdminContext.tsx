import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminData, CarouselItem, ContactInfo, Schedule, AboutContent } from '@/types/admin';
import truckHero1 from "@/assets/truck-hero-1.jpg";
import logisticsHero2 from "@/assets/logistics-hero-2.jpg";
import fleetHero3 from "@/assets/fleet-hero-3.jpg";

interface AdminContextType {
  isAuthenticated: boolean;
  adminData: AdminData;
  login: (password: string) => boolean;
  logout: () => void;
  updateCarousel: (carousel: CarouselItem[]) => void;
  updateContact: (contact: ContactInfo) => void;
  updateSchedule: (schedule: Schedule) => void;
  updateAbout: (about: AboutContent) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const defaultAdminData: AdminData = {
  carousel: [
    {
      id: '1',
      imageUrl: truckHero1,
      title: 'Transporte nacional de carga con más de 60 años de trayectoria',
      description: 'Experiencia y confiabilidad en cada entrega',
      order: 1
    },
    {
      id: '2',
      imageUrl: logisticsHero2,
      title: 'Unidades modernas y monitoreadas para mayor seguridad',
      description: 'Tecnología de vanguardia al servicio de su carga',
      order: 2
    },
    {
      id: '3',
      imageUrl: fleetHero3,
      title: 'Cobertura Rosario - Mar del Plata, con logística flexible',
      description: 'Conectamos las principales ciudades de Argentina',
      order: 3
    }
  ],
  contact: {
    rosarioPhone: '+54 341 439‑7465',
    marDelPlataPhone: '+54 223 477‑1190',
    email: 'eldirecto@live.com.ar',
    whatsapp: '+543414397465',
    rosarioAddress: 'Dirección Rosario (editable desde panel admin)',
    marDelPlataAddress: 'Dirección Mar del Plata (editable desde panel admin)'
  },
  schedule: {
    rosario: {
      weekdays: '07:00 – 15:30',
      saturday: '07:00 – 11:30',
      sunday: 'Cerrado'
    },
    marDelPlata: {
      weekdays: '08:00 – 16:00',
      saturday: '08:00 – 12:00',
      sunday: 'Cerrado'
    }
  },
  about: {
    content: `Desde 1960, en Transporte El Directo SRL ofrecemos soluciones logísticas seguras y eficientes, especializándonos en transporte de carga, encomiendas y servicios urbanos, interurbanos y de larga distancia.

Nuestro compromiso es garantizar cada entrega con puntualidad, seriedad y el respaldo de un equipo capacitado que comprende las necesidades específicas de cada cliente.

Conectamos Rosario y Mar del Plata con un servicio integral que abarca desde el transporte de mercaderías hasta la gestión logística completa, adaptándonos a los requerimientos particulares de cada empresa.`
  }
};

// Contraseña simple para el demo (en producción debería ser más segura)
const ADMIN_PASSWORD = 'admin123';

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState<AdminData>(defaultAdminData);

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

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('transportadora_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('transportadora_admin_auth');
  };

  const saveAdminData = (newData: AdminData) => {
    setAdminData(newData);
    localStorage.setItem('transportadora_admin_data', JSON.stringify(newData));
  };

  const updateCarousel = (carousel: CarouselItem[]) => {
    const newData = { ...adminData, carousel };
    saveAdminData(newData);
  };

  const updateContact = (contact: ContactInfo) => {
    const newData = { ...adminData, contact };
    saveAdminData(newData);
  };

  const updateSchedule = (schedule: Schedule) => {
    const newData = { ...adminData, schedule };
    saveAdminData(newData);
  };

  const updateAbout = (about: AboutContent) => {
    const newData = { ...adminData, about };
    saveAdminData(newData);
  };

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