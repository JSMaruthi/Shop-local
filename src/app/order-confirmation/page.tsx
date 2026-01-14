'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

function ConfirmationContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');

    return (
        <div className="container flex items-center justify-center py-24">
            <Card className="w-full max-w-lg text-center">
                <CardHeader>
                    <div className="mx-auto bg-green-100 rounded-full p-3 w-fit">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <CardTitle className="font-headline text-2xl mt-4">Thank you for your order!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Your order has been placed successfully. A confirmation email has been sent to you.
                    </p>
                    {orderId && (
                        <p className="font-semibold">
                            Order ID: <span className="font-mono text-primary">{orderId}</span>
                        </p>
                    )}
                    <div className="flex gap-4 justify-center pt-4">
                        <Button asChild>
                            <Link href="/products">Continue Shopping</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/orders">View My Orders</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}


export default function OrderConfirmationPage() {
    return (
        <Suspense fallback={<div className="container py-24">Loading confirmation...</div>}>
            <ConfirmationContent />
        </Suspense>
    )
}
