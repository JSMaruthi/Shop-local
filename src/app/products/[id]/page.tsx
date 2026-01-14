'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, CheckCircle, Package } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const product = products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
        addToCart(product);
    }
    toast({
      title: 'Added to cart',
      description: `${quantity} x ${product.name} added to your cart.`,
    });
    setQuantity(1);
  };
  
  const relatedImages = [
      product.imageUrl,
      `https://picsum.photos/seed/${params.id}a/600/600`,
      `https://picsum.photos/seed/${params.id}b/600/600`,
      `https://picsum.photos/seed/${params.id}c/600/600`,
  ];

  const [mainImage, setMainImage] = useState(relatedImages[0]);

  return (
    <div className="container py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <div className="aspect-square relative rounded-lg overflow-hidden border">
              <Image 
                  src={mainImage} 
                  alt={product.name} 
                  fill 
                  className="object-cover" 
                  data-ai-hint={product.imageHint}
              />
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4">
              {relatedImages.map((img, index) => (
                  <button key={index} onClick={() => setMainImage(img)} className={cn("aspect-square relative rounded-md overflow-hidden border-2", mainImage === img ? 'border-primary' : 'border-transparent')}>
                      <Image 
                          src={img}
                          alt={`${product.name} view ${index + 1}`}
                          fill
                          className="object-cover"
                      />
                  </button>
              ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <Badge variant="outline">{product.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold font-headline">{product.name}</h1>
          <p className="text-3xl font-headline text-primary">${product.price.toFixed(2)}</p>
          
          <div className="text-sm text-muted-foreground">
            <p className="prose dark:prose-invert max-w-none">{product.description}</p>
          </div>
          
          <div className="flex items-center gap-2">
            {product.stock > 0 ? (
                <>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-muted-foreground">{product.stock} in stock</span>
                </>
            ) : (
                <span className="text-sm text-destructive">Out of stock</span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-md">
                <Button variant="ghost" size="icon" onClick={() => setQuantity(q => Math.max(1, q-1))}><span className="sr-only">Decrease quantity</span>-</Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => setQuantity(q => Math.min(product.stock, q+1))}><span className="sr-only">Increase quantity</span>+</Button>
            </div>
            <Button size="lg" onClick={handleAddToCart} disabled={product.stock === 0} className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>

          <div className="border-t pt-6 space-y-4">
            <div className="flex items-center gap-3">
                <Package className="h-6 w-6 text-muted-foreground" />
                <div>
                    <h3 className="font-semibold">Free Shipping & Returns</h3>
                    <p className="text-sm text-muted-foreground">On all orders over $50.</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
