import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { products } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import Image from 'next/image';

export default function Home() {
  const featuredProducts = products.slice(0, 8);

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[400px] flex items-center justify-center text-center text-white">
        <Image
          src="https://picsum.photos/seed/homepage/1600/900"
          alt="Abstract background image"
          fill
          priority
          className="object-cover -z-10 brightness-50"
          data-ai-hint="abstract background"
        />
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-headline">
              Discover Quality, Delivered Locally
            </h1>
            <p className="mt-4 max-w-xl mx-auto text-lg md:text-xl text-slate-200">
              Your one-stop shop for everything from electronics to fashion. Experience the best of local e-commerce.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/products">Shop All Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 sm:py-24">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight text-center font-headline mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
