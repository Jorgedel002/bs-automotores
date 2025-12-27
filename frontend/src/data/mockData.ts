export type Client = {
  id: string
  name: string
  dni: string
  phone: string
  email: string
  status: 'activo' | 'inactivo'
}

export type Prospect = {
  id: string
  name: string
  interest: string
  stage: 'nuevo' | 'seguimiento' | 'cierre'
  assignedTo: string
}

export type Vehicle = {
  id: string
  image: string
  brand: string
  model: string
  year: number
  mileage: string
  engine: string
  transmission: string
  color: string
  plate: string
  price: string
}

export const clientsSeed: Client[] = [
  {
    id: 'CL-8923',
    name: 'María González',
    dni: '32.456.789',
    phone: '+54 11 4567-9988',
    email: 'maria.gonzalez@email.com',
    status: 'activo',
  },
  {
    id: 'CL-8120',
    name: 'Lucas Fernández',
    dni: '29.187.332',
    phone: '+54 11 5432-1188',
    email: 'lucasfz@email.com',
    status: 'activo',
  },
  {
    id: 'CL-7788',
    name: 'Sofía Méndez',
    dni: '31.334.567',
    phone: '+54 11 3555-7788',
    email: 'sofia.mendez@email.com',
    status: 'inactivo',
  },
  {
    id: 'CL-7412',
    name: 'Diego Paredes',
    dni: '30.555.998',
    phone: '+54 11 3221-9966',
    email: 'dparedes@email.com',
    status: 'activo',
  },
]

export const prospectsSeed: Prospect[] = [
  {
    id: 'PR-009',
    name: 'José Pereira',
    interest: 'Ford Ranger XLT',
    stage: 'seguimiento',
    assignedTo: 'Ayelén',
  },
  {
    id: 'PR-014',
    name: 'Claudia Navarro',
    interest: 'Chevrolet Tracker LTZ',
    stage: 'nuevo',
    assignedTo: 'Martín',
  },
  {
    id: 'PR-017',
    name: 'Ignacio López',
    interest: 'Toyota Corolla Hybrid',
    stage: 'cierre',
    assignedTo: 'Ayelén',
  },
  {
    id: 'PR-020',
    name: 'Marcela Varela',
    interest: 'Peugeot 208 Feline',
    stage: 'seguimiento',
    assignedTo: 'Camila',
  },
]

export const vehiclesSeed: Vehicle[] = [
  {
    id: 'VH-432',
    image:
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=60',
    brand: 'Toyota',
    model: 'Corolla Hybrid',
    year: 2023,
    mileage: '12.500 km',
    engine: '1.8L Híbrido',
    transmission: 'CVT',
    color: 'Gris Plata',
    plate: 'AB 123 CD',
    price: '$ 32.900.000',
  },
  {
    id: 'VH-452',
    image:
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=60',
    brand: 'Ford',
    model: 'Ranger XLT',
    year: 2022,
    mileage: '28.400 km',
    engine: '2.0L Biturbo',
    transmission: 'Automática 10v',
    color: 'Azul Metalizado',
    plate: 'AC 987 FG',
    price: '$ 48.700.000',
  },
  {
    id: 'VH-503',
    image: '/src/img/tracker-ltz.jpg',
    brand: 'Chevrolet',
    model: 'Tracker LTZ',
    year: 2021,
    mileage: '35.100 km',
    engine: '1.2L Turbo',
    transmission: 'Automática 6v',
    color: 'Rojo Burdeos',
    plate: 'AD 445 JK',
    price: '$ 26.200.000',
  },
  {
    id: 'VH-522',
    image:
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=60',
    brand: 'Toyota',
    model: 'SW4 SRX',
    year: 2020,
    mileage: '52.000 km',
    engine: '2.8L Turbo',
    transmission: 'Automática 6v',
    color: 'Negro Grafito',
    plate: 'AE 223 GO',
    price: '$ 59.400.000',
  },
]
