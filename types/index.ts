export type UserRole = "admin" | "manager" | "editor" | "viewer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  status: "active" | "inactive";
  createdAt: string;
  lastLogin?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  group: string;
  totalOrders: number;
  totalSpent: number;
  status: "active" | "inactive";
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string | null;
  description?: string;
  image?: string;
  sortOrder: number;
  status: "active" | "inactive";
  productCount: number;
  children?: Category[];
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  categoryId: string;
  categoryName?: string;
  price: number;
  specialPrice?: number;
  quantity: number;
  status: "active" | "inactive" | "out_of_stock";
  image?: string;
  images?: string[];
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
  shippingAddress: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  salesGrowth: number;
  ordersGrowth: number;
  customersGrowth: number;
  productsGrowth: number;
}

export interface SalesData {
  date: string;
  sales: number;
  orders: number;
}
