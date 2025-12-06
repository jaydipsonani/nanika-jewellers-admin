import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '@/components/admin/PageHeader';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { FormSelect } from '@/components/admin/FormSelect';
import { Button } from '@/components/ui/button';
import { mockOrders } from '@/data/mockData';
import { ArrowLeft, User, MapPin, Package, CreditCard } from 'lucide-react';

const orderStatusOptions = [
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function OrderDetails() {
  const { orderId } = useParams();
  const order = mockOrders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-muted-foreground mb-4">Order not found</p>
        <Link to="/admin/orders">
          <Button variant="admin-outline">Back to Orders</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <Link
          to="/admin/orders"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </Link>
        <PageHeader
          title={`Order ${order.id}`}
          description={`Placed on ${new Date(order.createdAt).toLocaleDateString()}`}
        >
          <div className="flex items-center gap-3">
            <StatusBadge status={order.paymentStatus} />
            <StatusBadge status={order.orderStatus} />
          </div>
        </PageHeader>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-card rounded-lg admin-shadow overflow-hidden">
            <div className="p-4 border-b border-border flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Order Items</h3>
            </div>
            <div className="divide-y divide-border">
              {order.items.map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">{item.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{item.price.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-muted/50 flex items-center justify-between">
              <span className="font-medium">Total</span>
              <span className="text-lg font-semibold">₹{order.totalAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div className="bg-card rounded-lg admin-shadow overflow-hidden">
            <div className="p-4 border-b border-border flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Payment Details</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{order.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (GST 3%)</span>
                <span>₹{Math.round(order.totalAmount * 0.03).toLocaleString()}</span>
              </div>
              <div className="pt-3 border-t border-border flex justify-between font-medium">
                <span>Grand Total</span>
                <span>₹{Math.round(order.totalAmount * 1.03).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-card rounded-lg admin-shadow overflow-hidden">
            <div className="p-4 border-b border-border flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Customer</h3>
            </div>
            <div className="p-4 space-y-2">
              <p className="font-medium">{order.customerName}</p>
              <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
              <p className="text-sm text-muted-foreground">{order.customerPhone}</p>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-card rounded-lg admin-shadow overflow-hidden">
            <div className="p-4 border-b border-border flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Shipping Address</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-muted-foreground">{order.shippingAddress}</p>
              <p className="text-sm mt-2">
                <span className="text-muted-foreground">Delivery:</span>{' '}
                <span className="font-medium">{order.deliveryDays} days</span>
              </p>
            </div>
          </div>

          {/* Status Update */}
          <div className="bg-card rounded-lg admin-shadow overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-medium">Update Status</h3>
            </div>
            <div className="p-4 space-y-3">
              <FormSelect
                label="Order Status"
                options={orderStatusOptions}
                defaultValue={order.orderStatus}
              />
              <Button variant="admin" className="w-full">
                Update Status
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
