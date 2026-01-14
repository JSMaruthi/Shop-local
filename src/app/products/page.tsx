
'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/lib/data';
import type { Category } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

const categories: Category[] = ['Electronics', 'Fashion', 'Footwear', 'Books', 'Home & Kitchen'];

function ProductGrid() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>(() => {
    const cat = searchParams.get('category');
    return categories.includes(cat as Category) ? (cat as Category) : 'all';
  });

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
        <div className="w-full md:w-1/3">
          <Select 
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value as Category | 'all')}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="relative w-full md:w-2/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search for products..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-headline font-semibold">No Products Found</h2>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filter.</p>
        </div>
      )}
    </div>
  );
}


export default function ProductsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProductGrid />
        </Suspense>
    );
}
