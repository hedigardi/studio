export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  sellerId: string;
  sellerName: string;
  city: string;
  foodType: string;
  availability: {
    startTime: string; // HH:MM
    endTime: string; // HH:MM
    days: string[]; // e.g., ["Mån", "Tis"]
  };
  deliveryOptions: string[]; // e.g., ["Hemleverans", "Avhämtning"]
  averageRating?: number; 
}

export interface Seller {
  id: string;
  name: string;
  city: string;
  bio?: string;
  profileImageUrl?: string;
}

export interface Review {
  id: string;
  dishId: string;
  sellerId: string;
  buyerName: string;
  rating: number; // 1-5
  comment: string;
  date: string; // ISO date string
}

export interface AuthUser {
  id: string;
  name: string;
  role: 'buyer' | 'seller';
}
