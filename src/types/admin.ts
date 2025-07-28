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
id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sucursal: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dia: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']]
    }
  },
  hora_inicio: {
    type: DataTypes.TIME,
    allowNull: false
  },
  hora_fin: {
    type: DataTypes.TIME,
    allowNull: false
  }
export interface Schedule {
  sucursal:string;
  dia:string;
  hora_inicio:string;
  hora_fin:string;
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