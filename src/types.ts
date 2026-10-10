export type Language = 'ky' | 'en' | 'ru';

export interface ServiceItem {
  id: string;
  category: 'hair' | 'shave' | 'beard' | 'vip_rituals' | 'spa';
  name: {
    ky: string;
    en: string;
    ru: string;
  };
  tagline: {
    ky: string;
    en: string;
    ru: string;
  };
  durationMin: number;
  price: number;
  description: {
    ky: string;
    en: string;
    ru: string;
  };
  rituals: {
    ky: string[];
    en: string[];
    ru: string[];
  };
  includesBeverage: boolean;
  popular?: boolean;
  image: string;
}

export interface BarberArtisan {
  id: string;
  name: string;
  title: {
    ky: string;
    en: string;
    ru: string;
  };
  bio: {
    ky: string;
    en: string;
    ru: string;
  };
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  specialties: {
    ky: string[];
    en: string[];
    ru: string[];
  };
  awards: string[];
  photo: string;
  instagramHandle: string;
  availableDays: string[];
}

export interface ApothecaryProduct {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: 'pomade' | 'beard' | 'razors' | 'scents' | 'care';
  rating: number;
  reviewsCount: number;
  description: {
    ky: string;
    en: string;
    ru: string;
  };
  volume: string;
  ingredients: string[];
  image: string;
  badge?: string;
}

export interface LookbookItem {
  id: string;
  title: {
    ky: string;
    en: string;
    ru: string;
  };
  category: 'fades' | 'classic' | 'beard' | 'rituals';
  barberName: string;
  image: string;
  description: {
    ky: string;
    en: string;
    ru: string;
  };
}

export interface CustomerReview {
  id: string;
  author: string;
  title: string;
  location: string;
  rating: number;
  date: string;
  comment: {
    ky: string;
    en: string;
    ru: string;
  };
  verified: boolean;
  avatar?: string;
}

export interface VipClubTier {
  id: string;
  name: string;
  pricePerMonth: number;
  tagline: {
    ky: string;
    en: string;
    ru: string;
  };
  features: {
    ky: string[];
    en: string[];
    ru: string[];
  };
  popular?: boolean;
  badge?: string;
}

export interface BookingState {
  selectedServiceIds: string[];
  selectedAddonIds: string[];
  selectedBarberId: string | null;
  selectedDate: string;
  selectedTime: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  selectedBeverage: string;
  specialRequests: string;
  status: 'draft' | 'confirmed';
  bookingReference?: string;
}

export interface CartItem {
  product: ApothecaryProduct;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'system';
  text: string;
  timestamp: string;
  actionType?: 'book' | 'menu' | 'ai_consultant' | 'contact' | 'apothecary';
  actionData?: string;
  suggestedQuestions?: string[];
}
