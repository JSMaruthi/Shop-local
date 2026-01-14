'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(0.01, 'Price must be positive'),
  category: z.enum(['Electronics', 'Fashion', 'Footwear', 'Books', 'Home & Kitchen']),
  stock: z.coerce.number().min(0, 'Stock cannot be negative'),
  imageUrl: z.string().url('Must be a valid URL'),
});

interface ProductFormProps {
  product?: Product | null;
  onSave: (product: Omit<Product, 'id'>) => void;
}

export function ProductForm({ product, onSave }: ProductFormProps) {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || 0,
      category: product?.category || 'Electronics',
      stock: product?.stock || 0,
      imageUrl: product?.imageUrl || '',
    },
  });

  function onSubmit(values: z.infer<typeof productSchema>) {
    onSave(values as Omit<Product, 'id' | 'imageHint'>);
    toast({
        title: `Product ${product ? 'updated' : 'created'}`,
        description: `${values.name} has been saved.`,
    })
  }

  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle className="font-headline">{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="price" render={({ field }) => (
                <FormItem><FormLabel>Price</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="stock" render={({ field }) => (
                <FormItem><FormLabel>Stock</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
          <FormField control={form.control} name="category" render={({ field }) => (
            <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>
                        {['Electronics', 'Fashion', 'Footwear', 'Books', 'Home & Kitchen'].map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="imageUrl" render={({ field }) => (
            <FormItem><FormLabel>Image URL</FormLabel><FormControl><Input placeholder="https://..." {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          
          <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save Product</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
