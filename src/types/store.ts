export type FabricCategory =
  | 'All'
  | 'Swiss Voile Lawn'
  | 'Jacquard & Silk'
  | 'Winter Karandi'
  | 'Cambric';

export interface FabricPieceSpec {
  piece: string;
  fabric: string;
  measurement: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: Exclude<FabricCategory, 'All'>;
  pieceCount: string;
  season: string;
  price: number;
  colorway: string;
  inStock: boolean;
  tagline: string;
  description: string;
  embroideryDetail: string;
  careInstructions: string;
  image: string;
  imageAlt: string;
  specs: FabricPieceSpec[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderFormData {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  postalCode: string;
  paymentMethod: 'COD' | 'Bank Transfer';
}

export interface OrderRecord {
  orderId: string;
  createdAt: string;
  status: string;
  customer: OrderFormData;
  items: Array<{
    id: string;
    name: string;
    sku: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  deliveryFee: number;
  total: number;
}
