'use client';

import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, totalPrice, cartCount } = useCart();

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold font-headline mb-8">Your Shopping Cart</h1>
      {cartCount > 0 ? (
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-6">
            {cartItems.map(item => (
              <Card key={item.product.id} className="flex items-center p-4">
                <div className="relative h-24 w-24 rounded-md overflow-hidden">
                  <Image
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    data-ai-hint={item.product.imageHint}
                  />
                </div>
                <div className="flex-1 ml-4">
                  <h3 className="font-semibold font-headline">{item.product.name}</h3>
                  <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-4">
                    <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value, 10))}
                        className="w-16 h-9 text-center"
                    />
                    <p className="w-20 text-right font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                    <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.product.id)}>
                        <Trash2 className="h-5 w-5 text-muted-foreground" />
                    </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg">
                    <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
            <h2 className="mt-6 text-2xl font-semibold font-headline">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild className="mt-6">
                <Link href="/products">Start Shopping</Link>
            </Button>
        </div>
      )}
    </div>
  );
}
