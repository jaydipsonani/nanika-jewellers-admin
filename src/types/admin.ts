export type DiamondCategory = 'natural' | 'lab-grown';

export type DiamondShape = 
  | 'asscher' 
  | 'cushion' 
  | 'emerald' 
  | 'heart' 
  | 'marquise' 
  | 'oval' 
  | 'pear' 
  | 'princess' 
  | 'radiant' 
  | 'round';

export type Clarity = 'IF' | 'VVS1' | 'VVS2' | 'VS1' | 'VS2' | 'SI1' | 'SI2';

export type Cut = 'Excellent' | 'Very Good' | 'Good';

export type DiamondStatus = 'active' | 'hidden';

export interface Diamond {
  id: string;
  category: DiamondCategory;
  shape: DiamondShape;
  color: string;
  clarity: Clarity;
  cut: Cut;
  carat: number;
  cent: number;
  certificateNo: string;
  deliveryDays: number;
  price: number;
  image?: string;
  status: DiamondStatus;
  createdAt: Date;
}

export type JewelleryCategory = 'ring' | 'earring' | 'pendant' | 'bracelet' | 'necklace' | 'watch';

export type MetalType = '9K' | '14K' | '18K';

export type MetalColor = 'gold' | 'rose-gold' | 'silver';

export interface DiamondDetail {
  id: string;
  size: string;
  color: string;
  clarity: string;
  shape: string;
  noOfDiamonds: number;
  totalWeight: number;
}

export interface Jewellery {
  id: string;
  category: JewelleryCategory;
  title: string;
  description: string;
  metalType: MetalType;
  metalColor: MetalColor;
  ringSize?: number;
  productWeight: number;
  grossWeight: number;
  netWeight: number;
  diamonds: DiamondDetail[];
  price: number;
  image?: string;
  status: 'active' | 'hidden';
  createdAt: Date;
}

export type PaymentStatus = 'paid' | 'pending' | 'failed';

export type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: string;
  type: 'diamond' | 'jewellery';
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  deliveryDays: number;
  shippingAddress: string;
  createdAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  createdAt: Date;
}

export interface SalesStats {
  totalOrders: number;
  totalRevenue: number;
  totalItemsSold: number;
}
