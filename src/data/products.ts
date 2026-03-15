export type Category = 'Kitoblar' | 'Texnika' | 'O\'quv jihozlari' | 'Talaba uchun buyumlar';
export type Condition = 'Yangi' | 'Ikkinchi qo\'l';

export interface Seller {
  id: string;
  name: string;
  university: string;
  rating: number;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  category: Category;
  condition: Condition;
  image: string;
  seller: Seller;
  description: string;
  isBestSeller?: boolean;
}

