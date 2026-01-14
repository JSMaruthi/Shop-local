'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { createOrder } from '@/actions/order';
import { useToast } from '@/hooks/use-toast';

const addressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'ZIP code is required'),
  country: z.string().min(1, 'Country is required'),
});

const paymentSchema = z.object({
    paymentMethod: z.enum(['COD', 'Card'], { required_error: 'Please select a payment method.' }),
    cardNumber: z.string().optional(),
    expiryDate: z.string().optional(),
    cvv: z.string().optional(),
});

const checkoutSchema = addressSchema.merge(paymentSchema).refine(data => {
    if (data.paymentMethod === 'Card') {
        return !!data.cardNumber && !!data.expiryDate && !!data.cvv;
    }
    return true;
}, {
    message: 'Card details are required for card payment.',
    path: ['cardNumber'], // you can specify which field to show the error on
});

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      street: '', city: '', state: '', zip: '', country: 'USA',
      paymentMethod: 'COD',
    },
  });

  const paymentMethod = form.watch('paymentMethod');

  async function onSubmit(values: z.infer<typeof checkoutSchema>) {
    if (cartItems.length === 0) {
        toast({
            title: 'Your cart is empty',
            description: 'Please add items to your cart before checking out.',
            variant: 'destructive',
        });
        return;
    }
    
    await createOrder({
        cartItems,
        shippingAddress: {
            street: values.street,
            city: values.city,
            state: values.state,
            zip: values.zip,
            country: values.country,
        },
        paymentMethod: values.paymentMethod,
    });
    // The cart is cleared on the server side now, then it redirects.
    // We also clear it here to update the UI state immediately.
    clearCart();
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold font-headline mb-8">Checkout</h1>
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <Card>
                        <CardHeader><CardTitle className="font-headline">Shipping Address</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <FormField control={form.control} name="street" render={({ field }) => (
                                <FormItem><FormLabel>Street</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <div className="grid md:grid-cols-2 gap-4">
                                <FormField control={form.control} name="city" render={({ field }) => (
                                    <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="state" render={({ field }) => (
                                    <FormItem><FormLabel>State</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                            </div>
                             <div className="grid md:grid-cols-2 gap-4">
                                <FormField control={form.control} name="zip" render={({ field }) => (
                                    <FormItem><FormLabel>ZIP Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="country" render={({ field }) => (
                                    <FormItem><FormLabel>Country</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle className="font-headline">Payment Method</CardTitle></CardHeader>
                        <CardContent>
                            <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                                <FormItem className="space-y-3">
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl><RadioGroupItem value="COD" /></FormControl>
                                        <FormLabel className="font-normal">Cash on Delivery</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl><RadioGroupItem value="Card" /></FormControl>
                                        <FormLabel className="font-normal">Credit/Debit Card</FormLabel>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )} />
                             {paymentMethod === 'Card' && (
                                <div className="space-y-4 mt-4 border-t pt-4">
                                    <FormField control={form.control} name="cardNumber" render={({ field }) => (
                                        <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="XXXX XXXX XXXX XXXX" {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField control={form.control} name="expiryDate" render={({ field }) => (
                                            <FormItem><FormLabel>Expiry Date</FormLabel><FormControl><Input placeholder="MM/YY" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <FormField control={form.control} name="cvv" render={({ field }) => (
                                            <FormItem><FormLabel>CVV</FormLabel><FormControl><Input placeholder="123" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                    <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Place Order</Button>
                </form>
            </Form>
        </div>
        <div className="md:col-span-1">
            <Card>
                <CardHeader><CardTitle className="font-headline">Order Summary</CardTitle></CardHeader>
                <CardContent>
                    <div className="space-y-2">
                    {cartItems.map(item => (
                        <div key={item.product.id} className="flex justify-between items-center text-sm">
                            <span>{item.product.name} x {item.quantity}</span>
                            <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    </div>
                    <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
