'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { users } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email(),
  street: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
});

export default function ProfilePage() {
  // In a real app, you would get the logged-in user's data
  const user = users.find(u => u.role === 'customer');
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      street: user?.shippingAddress?.street || '',
      city: user?.shippingAddress?.city || '',
      state: user?.shippingAddress?.state || '',
      zip: user?.shippingAddress?.zip || '',
      country: user?.shippingAddress?.country || '',
    },
  });

  function onSubmit(values: z.infer<typeof profileSchema>) {
    console.log(values);
    // Handle profile update logic here
    toast({
        title: "Profile Updated",
        description: "Your information has been saved successfully.",
    });
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold font-headline mb-8">My Profile</h1>
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="font-headline">Personal Information</CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" disabled {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
            </CardContent>

            <CardHeader className="pt-0">
              <CardTitle className="font-headline">Shipping Address</CardTitle>
              <CardDescription>Your default address for deliveries.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <FormField control={form.control} name="street" render={({ field }) => (
                    <FormItem><FormLabel>Street</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="state" render={({ field }) => (
                        <FormItem><FormLabel>State</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="zip" render={({ field }) => (
                        <FormItem><FormLabel>ZIP Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="country" render={({ field }) => (
                        <FormItem><FormLabel>Country</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                 <div className="flex justify-end pt-4">
                    <Button type="submit">Save Changes</Button>
                 </div>
            </CardContent>
          </form>
        </Form>
      </Card>
    </div>
  );
}
