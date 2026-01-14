'use client';

import { useState } from 'react';
import { orders as initialOrders } from '@/lib/data';
import type { Order } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
  };
  
  const getStatusClass = (status: Order['status']) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'Shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-8">Manage Orders</h1>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Update Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.createdAt.toLocaleDateString()}</TableCell>
                <TableCell>Customer {order.userId}</TableCell>
                <TableCell className="text-right">${order.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                    <Badge className={cn("text-xs", getStatusClass(order.status))} variant="outline">{order.status}</Badge>
                </TableCell>
                <TableCell>
                  <Select onValueChange={(value: Order['status']) => handleStatusChange(order.id, value)}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Update..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
