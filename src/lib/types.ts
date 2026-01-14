export type Category = 'Electronics' | 'Fashion' | 'Footwear' | 'Books' | 'Home & Kitchen';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  stock: number;
  imageUrl: string;
  imageHint: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type ShippingAddress = {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type Order = {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: ShippingAddress;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: Date;
  paymentMethod: 'COD' | 'Card';
};

export type User = {
    id: string;
    name: string;
    email: string;
    role: 'customer' | 'admin';
    shippingAddress?: ShippingAddress;
}
