export interface CarouselItem {
  id: string;
  image?: string;
  title: string;
  description: string;
  order: number;
  imageFile: File;
}

export interface ContactInfo {
  telefono: string;
  email: string;
  whatsapp: string;
  Address: string;
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
  contact: ContactInfo;
  schedule: Schedule[];
  about: AboutContent;
}