export interface Room {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  imageUrl: string;
  images: string[];
  amenities: string[];
}

export interface Booking {
  id: string;
  roomId: string;
  guestName: string;
  checkIn: string;
  checkOut: string;
  totalAmount: number;
  date: string;
  numberOfDays: number;
  gender: string;
  age: number;
  hasGuest: boolean;
  guestGender?: string;
  guestAge?: number;
}

export interface CEOStats {
  totalRevenue: number;
  totalBookings: number;
  occupancyRate: number;
  monthlyRevenue: { month: string; revenue: number }[];
}

export const initialRooms: Room[] = [
  {
    id: 'r1',
    name: 'The Grand Penthouse',
    description: 'A sprawling suite with panoramic city views, private plunge pool, and dedicated butler service.',
    pricePerNight: 250000,
    imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070&auto=format&fit=crop',
    ],
    amenities: ['Ocean View', 'Private Pool', 'Butler', 'Spa Access'],
  },
  {
    id: 'r2',
    name: 'Executive Marina Suite',
    description: 'Sophisticated aesthetics featuring floor-to-ceiling windows overlooking the marina harbor.',
    pricePerNight: 95000,
    imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop',
    ],
    amenities: ['Marina View', 'King Bed', 'Rain Shower', 'Lounge Access'],
  },
  {
    id: 'r3',
    name: 'Serenity Jungle Villa',
    description: 'Immersed in lush tropical foliage, this standalone villa offers complete privacy and tranquility.',
    pricePerNight: 150000,
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2057&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2049&auto=format&fit=crop',
    ],
    amenities: ['Private Garden', 'Outdoor Tub', 'In-room Dining', 'Eco-friendly'],
  },
  {
    id: 'r4',
    name: 'Classic Luxury King',
    description: 'Timeless elegance meets modern comfort in our signature luxury accommodations.',
    pricePerNight: 50000,
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587985064135-0571b93b16a7?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop',
    ],
    amenities: ['City View', 'King Bed', 'Mini Bar', 'Free WiFi'],
  }
];

export const initialCEOStats: CEOStats = {
  totalRevenue: 14500000,
  totalBookings: 84,
  occupancyRate: 82,
  monthlyRevenue: [
    { month: 'Jan', revenue: 9500000 },
    { month: 'Feb', revenue: 11000000 },
    { month: 'Mar', revenue: 13500000 },
    { month: 'Apr', revenue: 12000000 },
    { month: 'May', revenue: 14500000 },
  ],
};
