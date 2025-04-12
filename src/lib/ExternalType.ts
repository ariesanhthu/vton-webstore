// Define the types for the nested objects
export interface ProductImage {
    url: string;
    alt: string;
  }
  
export interface Size {
    value: string;
    label: string;
    available: boolean;
  }
  
export interface Color {
    name: string;
    value: string;
    available: boolean;
  }
  
  // Define the main ProductProps interface
export interface ProductProps {
    id: string;
    name: string;
    brand: string;
    description: string;
    price: number;
    originalPrice: number;
    imageUrl: string;
    images: ProductImage[];
    sizes: Size[];
    colors: Color[];
    fabric: string;
    care: string[];
    features: string[];
    stock: number;
    rating: number;
    reviewCount: number;
    category: string;
    tags: string[];
  }
 