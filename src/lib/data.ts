import type { Product, Order, User } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Modern Smartphone',
    description: 'A modern smartphone with a large screen, powerful processor, and an amazing camera.',
    price: 699.99,
    category: 'Electronics',
    stock: 50,
    imageUrl: 'https://picsum.photos/seed/1/400/300',
    imageHint: 'smartphone screen'
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    description: 'High-fidelity wireless over-ear headphones with active noise cancellation and 20-hour battery life.',
    price: 199.99,
    category: 'Electronics',
    stock: 75,
    imageUrl: 'https://picsum.photos/seed/2/400/300',
    imageHint: 'headphones audio'
  },
  {
    id: '3',
    name: 'Men\'s Cotton T-Shirt',
    description: 'A stylish and comfortable 100% cotton t-shirt, perfect for casual wear. Available in various colors.',
    price: 24.99,
    category: 'Fashion',
    stock: 200,
    imageUrl: 'https://picsum.photos/seed/3/400/300',
    imageHint: 't-shirt fashion'
  },
  {
    id: '4',
    name: 'Women\'s Denim Jeans',
    description: 'Classic blue denim jeans for women, featuring a slim-fit design and durable fabric.',
    price: 89.99,
    category: 'Fashion',
    stock: 120,
    imageUrl: 'https://picsum.photos/seed/4/400/300',
    imageHint: 'denim jeans'
  },
  {
    id: '5',
    name: 'Men\'s Running Shoes',
    description: 'Lightweight and comfortable running shoes with advanced cushioning for maximum performance.',
    price: 129.99,
    category: 'Footwear',
    stock: 90,
    imageUrl: 'https://picsum.photos/seed/5/400/300',
    imageHint: 'running shoes'
  },
  {
    id: '6',
    name: 'Women\'s High-Heels',
    description: 'Elegant high-heels for formal occasions, crafted from premium materials.',
    price: 149.99,
    category: 'Footwear',
    stock: 60,
    imageUrl: 'https://picsum.photos/seed/6/400/300',
    imageHint: 'high heels'
  },
  {
    id: '7',
    name: 'The Last Wish',
    description: 'A captivating fantasy novel by Andrzej Sapkowski that introduces the world of The Witcher.',
    price: 15.99,
    category: 'Books',
    stock: 150,
    imageUrl: 'https://picsum.photos/seed/7/400/300',
    imageHint: 'fantasy book'
  },
  {
    id: '8',
    name: 'Eloquent JavaScript',
    description: 'A comprehensive guide to JavaScript programming for beginners and experts alike by Marijn Haverbeke.',
    price: 39.99,
    category: 'Books',
    stock: 100,
    imageUrl: 'https://picsum.photos/seed/8/400/300',
    imageHint: 'coding book'
  },
  {
    id: '9',
    name: 'Ultra-Slim Laptop',
    description: 'A sleek and powerful laptop with a 14-inch display, ideal for work and entertainment on the go.',
    price: 1299.99,
    category: 'Electronics',
    stock: 30,
    imageUrl: 'https://picsum.photos/seed/9/400/300',
    imageHint: 'laptop technology'
  },
  {
    id: '10',
    name: 'Men\'s Leather Jacket',
    description: 'A timeless fashionable leather jacket made from genuine sheepskin.',
    price: 249.99,
    category: 'Fashion',
    stock: 45,
    imageUrl: 'https://picsum.photos/seed/10/400/300',
    imageHint: 'leather jacket'
  },
  {
    id: '11',
    name: 'Unisex Sneakers',
    description: 'A pair of stylish and versatile sneakers perfect for everyday wear.',
    price: 79.99,
    category: 'Footwear',
    stock: 180,
    imageUrl: 'https://picsum.photos/seed/11/400/300',
    imageHint: 'sneakers footwear'
  },
  {
    id: '12',
    name: 'Dune',
    description: 'A classic science fiction novel by Frank Herbert, a cornerstone of the genre.',
    price: 19.99,
    category: 'Books',
    stock: 130,
    imageUrl: 'https://picsum.photos/seed/12/400/300',
    imageHint: 'science fiction'
  },
  {
    id: '13',
    name: 'Espresso Machine',
    description: 'A professional-grade espresso machine for brewing barista-quality coffee at home.',
    price: 499.99,
    category: 'Home & Kitchen',
    stock: 40,
    imageUrl: 'https://picsum.photos/seed/13/400/300',
    imageHint: 'coffee maker'
  },
  {
    id: '14',
    name: 'Cookware Set',
    description: 'A 10-piece set of non-stick cookware, including pots, pans, and utensils.',
    price: 179.99,
    category: 'Home & Kitchen',
    stock: 65,
    imageUrl: 'https://picsum.photos/seed/14/400/300',
    imageHint: 'cookware kitchen'
  }
];

export const users: User[] = [
    {
        id: '1',
        name: 'Admin User',
        email: 'admin@shoplocal.com',
        role: 'admin',
    },
    {
        id: '2',
        name: 'Customer User',
        email: 'customer@shoplocal.com',
        role: 'customer',
        shippingAddress: {
            street: '123 Market St',
            city: 'San Francisco',
            state: 'CA',
            zip: '94103',
            country: 'USA'
        }
    }
];

export const orders: Order[] = [
    {
        id: 'ORD-001',
        userId: '2',
        items: [
            { product: products[0], quantity: 1 },
            { product: products[2], quantity: 2 },
        ],
        totalAmount: 749.97,
        shippingAddress: {
            street: '123 Market St',
            city: 'San Francisco',
            state: 'CA',
            zip: '94103',
            country: 'USA'
        },
        status: 'Delivered',
        createdAt: new Date('2023-10-15T14:48:00.000Z'),
        paymentMethod: 'Card'
    },
    {
        id: 'ORD-002',
        userId: '2',
        items: [
            { product: products[4], quantity: 1 },
        ],
        totalAmount: 129.99,
        shippingAddress: {
            street: '123 Market St',
            city: 'San Francisco',
            state: 'CA',
            zip: '94103',
            country: 'USA'
        },
        status: 'Shipped',
        createdAt: new Date('2023-10-28T10:20:00.000Z'),
        paymentMethod: 'COD'
    }
];
