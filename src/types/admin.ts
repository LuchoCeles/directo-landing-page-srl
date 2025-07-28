export interface CarouselItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  order: number;
}

export interface ContactInfo {
  telefono: string;
  email: string;
  whatsapp: string;
  Address: string;
}

export interface Schedule {
  sucursal:string;
  dia:string;
  horario:string;
}

export interface AboutContent {
  content: string;
}

export interface AdminData {
  carousel: CarouselItem[];
  contact: ContactInfo;
  schedule: Schedule;
  about: AboutContent;
}