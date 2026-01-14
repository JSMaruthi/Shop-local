'use client';

import { useState } from 'react';
import { products as initialProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { ProductForm } from './ProductForm';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Image from 'next/image';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleSaveProduct = (productData: Omit<Product, 'id'>) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...productData } : p));
    } else {
      // Add new product
      const newProduct: Product = { 
        id: (products.length + 1).toString(),
        ...productData,
        imageHint: 'custom product'
      };
      setProducts([...products, newProduct]);
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };
  
  const handleDelete = (productId: string) => {
      setProducts(products.filter(p => p.id !== productId));
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-headline">Products</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setEditingProduct(null)}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Product
                </Button>
            </DialogTrigger>
            {(isFormOpen) && <ProductForm product={editingProduct} onSave={handleSaveProduct} />}
        </Dialog>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map(product => (
              <TableRow key={product.id}>
                <TableCell>
                    <Image src={product.imageUrl} alt={product.name} width={48} height={48} className="rounded-md object-cover" />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">{product.stock}</TableCell>
                <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(product)}>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(product.id)} className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
