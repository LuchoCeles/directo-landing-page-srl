export interface CarouselItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  order: number;
}

export interface ContactInfo {
  rosarioPhone: string;
  marDelPlataPhone: string;
  email: string;
  whatsapp: string;
  rosarioAddress: string;
  marDelPlataAddress: string;
}

export interface Schedule {
  rosario: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  marDelPlata: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
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