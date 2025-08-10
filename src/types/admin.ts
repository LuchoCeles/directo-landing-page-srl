export interface CarouselItem {
  id: string;
  image?: string;
  title: string;
  description: string;
  order: number;
  imageFile: File;
}

export interface ContactInfo {
  id: string;
  sucursal?: string;
  telefono: string;
  email: string;
  whatsapp: string;
  address: string;
}

export interface Mail {
  name: string;
  phone: string;
  email: string;
  company: string;
  message: string;
}

export interface Schedule {
  id: number;
  dia: string;
  horario: string;
  sucursal: {
    id: number;
    nombre: string;
  };
}

export interface AboutContent {
  id: string;
  content: string;
}

export interface AdminData {
  carousel: CarouselItem[];
  contact: ContactInfo[];
  schedule: Schedule[];
  about: AboutContent;
}