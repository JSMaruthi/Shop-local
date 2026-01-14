'use server';

import { redirect } from 'next/navigation';
import type { CartItem, ShippingAddress } from '@/lib/types';
import { cookies } from 'next/headers';

interface OrderData {
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'COD' | 'Card';
}

export async function createOrder(data: OrderData) {
  console.log('Creating order with data:', data);

  // In a real application, you would:
  // 1. Get the authenticated user's ID.
  // 2. Verify product prices and stock from the database.
  // 3. Create an Order record in the database.
  // 4. If payment is by card, process payment with a payment gateway (e.g., Stripe).
  // 5. Decrease product stock.
  // 6. Send a confirmation email.

  const orderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  console.log(`Order ${orderId} created successfully.`);

  // 7. Clear the user's cart from cookies.
  cookies().set('cart', '[]');

  // For this simulation, we'll just redirect to a confirmation page.
  redirect(`/order-confirmation?orderId=${orderId}`);
}
