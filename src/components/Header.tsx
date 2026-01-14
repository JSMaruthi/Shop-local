'use client';

import Link from 'next/link';
import { ShoppingBag, User, Search, Menu, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useCart } from '@/hooks/use-cart';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from './ui/badge';
import { Input } from './ui/input';

export function Header() {
  const { cartCount } = useCart();
  const isMobile = useIsMobile();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/orders', label: 'My Orders' },
    { href: '/admin/dashboard', label: 'Admin' },
  ];

  const desktopNav = (
    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="transition-colors hover:text-primary"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  const mobileNav = (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium mt-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Store className="h-6 w-6" />
            <span className="sr-only">ShopLocal</span>
          </Link>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {!isMobile && (
          <Link href="/" className="mr-6 flex items-center gap-2">
            <Store className="h-6 w-6 text-primary" />
            <span className="font-headline font-bold text-lg">ShopLocal</span>
          </Link>
        )}
        {isMobile ? mobileNav : desktopNav}
        <div className="flex flex-1 items-center justify-end gap-4">
          <div className="relative hidden sm:block w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-10" />
          </div>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/profile">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/cart">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge
                  variant="solid"
                  className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary text-primary-foreground"
                >
                  {cartCount}
                </Badge>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
