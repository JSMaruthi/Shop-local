import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import { products, orders, users } from "@/lib/data";

export default function AdminDashboardPage() {
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalSales = orders.length;
    const totalProducts = products.length;
    const totalUsers = users.length;

    const stats = [
        { title: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign },
        { title: "Total Sales", value: `+${totalSales}`, icon: ShoppingCart },
        { title: "Products", value: totalProducts, icon: Package },
        { title: "Customers", value: totalUsers, icon: Users },
    ];

  return (
    <div>
        <h1 className="text-3xl font-bold font-headline mb-8">Dashboard</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
        
        <div className="mt-8">
            <Card>
                <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* A more detailed order list component would go here */}
                    <p>Recent orders will be displayed here.</p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
