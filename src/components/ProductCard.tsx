'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg h-full">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block">
          <div className="aspect-[4/3] relative">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint={product.imageHint}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <p className="text-sm text-muted-foreground">{product.category}</p>
        <CardTitle className="mt-1 text-lg font-headline">
          <Link href={`/products/${product.id}`} className="hover:text-primary">
            {product.name}
          </Link>
        </CardTitle>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="text-lg font-semibold font-headline text-primary">
          ${product.price.toFixed(2)}
        </p>
        <Button size="sm" onClick={handleAddToCart} variant="outline">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
