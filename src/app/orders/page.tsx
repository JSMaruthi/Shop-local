import { orders } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function OrdersPage() {
  // In a real app, you'd fetch orders for the logged-in user.
  const userOrders = orders.filter(o => o.userId === '2');

  const getStatusClass = (status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled') => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'Shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold font-headline mb-8">My Orders</h1>

      {userOrders.length > 0 ? (
        <div className="space-y-8">
          {userOrders.map(order => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row justify-between items-start">
                <div>
                  <CardTitle className="font-headline">Order {order.id}</CardTitle>
                  <CardDescription>
                    Placed on {order.createdAt.toLocaleDateString()}
                  </CardDescription>
                </div>
                <Badge className={cn("text-xs", getStatusClass(order.status))} variant="outline">
                  {order.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map(item => (
                    <div key={item.product.id} className="flex items-center gap-4">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden">
                        <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold">{item.product.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="ml-auto font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center bg-muted/50 p-4">
                <span className="font-semibold">Total: ${order.totalAmount.toFixed(2)}</span>
                <Button variant="outline" size="sm">Track Order</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-2xl font-semibold font-headline">No orders found</h2>
          <p className="mt-2 text-muted-foreground">You haven't placed any orders yet.</p>
          <Button asChild className="mt-6">
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
