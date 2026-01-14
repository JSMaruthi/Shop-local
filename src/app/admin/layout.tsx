'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingCart, Package, Users, Store } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { href: '/admin/users', label: 'Users', icon: Users },
];

function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-background">
        <div className="p-4 border-b">
             <Link href="/admin/dashboard" className="flex items-center gap-2">
                <Store className="h-6 w-6 text-primary" />
                <span className="font-headline font-bold text-lg">Admin Panel</span>
            </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
            {navItems.map(item => (
                <Link key={item.href} href={item.href}>
                    <Button 
                        variant={pathname.startsWith(item.href) ? 'secondary' : 'ghost'} 
                        className="w-full justify-start"
                    >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                    </Button>
                </Link>
            ))}
        </nav>
        <div className="p-4 border-t">
            <Link href="/">
                <Button variant="outline" className="w-full">Back to Store</Button>
            </Link>
        </div>
    </aside>
  );
}


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // In a real app, you would add authentication logic here to protect admin routes.
  // For example:
  // const { user, isLoading } = useAuth();
  // if (isLoading) return <p>Loading...</p>;
  // if (!user || user.role !== 'admin') {
  //   redirect('/login');
  //   return null;
  // }
  
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8 bg-muted/40">
        {children}
      </main>
    </div>
  );
}
