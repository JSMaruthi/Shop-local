import Link from 'next/link';
import { Store, Twitter, Facebook, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Store className="h-6 w-6 text-primary" />
              <span className="font-headline font-bold text-lg">ShopLocal</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your friendly neighborhood online store.
            </p>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-sm hover:text-primary">All Products</Link></li>
              <li><Link href="/products?category=Electronics" className="text-sm hover:text-primary">Electronics</Link></li>
              <li><Link href="/products?category=Fashion" className="text-sm hover:text-primary">Fashion</Link></li>
              <li><Link href="/products?category=Books" className="text-sm hover:text-primary">Books</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm hover:text-primary">Contact Us</Link></li>
              <li><Link href="#" className="text-sm hover:text-primary">Shipping & Returns</Link></li>
              <li><Link href="#" className="text-sm hover:text-primary">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-headline font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram /></Link>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ShopLocal. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
