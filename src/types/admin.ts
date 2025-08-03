export interface CarouselItem {
  id: string;
  image?: string;
  title: string;
  description: string;
  order: number;
  imageFile: File;
}

export interface ContactInfo {
  id:string;
  sucursal?:string;
  telefono: string;
  email: string;
  whatsapp: string;
  address: string;
}

export interface Schedule {
  id?:string;
  sucursal:string;
  dia:string;
  horario:string;
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