export type ServiceCategory = 'Preparation' | 'Finishing' | 'Specialty';

export interface PaintingService {
  id: string;
  title: string;
  category: ServiceCategory;
  shortDescription: string;
  longDescription: string;
  pricePerSqm: number;
  estimatedHoursPerSqm: number;
  materialsIncluded: string[];
  steps: { title: string; desc: string }[];
  image: string;
  benefits: string[];
  videoUrl?: string;
}

export interface CustomQuoteConfig {
  roomName: string;
  width: number; // meters
  length: number; // meters
  height: number; // meters
  includeUndercoat: boolean;
  includeSkimming: boolean;
  includeWallpaperPrep: boolean;
  paintGrade: 'standard' | 'premium' | 'eco_luxe';
  totalArea: number; // calculated
  totalCost: number; // calculated
}

export interface CartItem {
  id: string; // unique item id
  title: string;
  type: 'predefined_service' | 'custom_quote';
  basePrice: number;
  totalPrice: number;
  areaSqm: number;
  details: {
    roomInfo?: {
      name: string;
      dimensions: string;
    };
    options: string[];
    paintGrade?: string;
  };
}

export interface ProjectBeforeAfter {
  id: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'booking' | 'process' | 'pricing' | 'care';
}
