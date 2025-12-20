import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '@/components/admin/PageHeader';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { FormSelect } from '@/components/admin/FormSelect';
import { Button } from '@/components/admin/Button';
import { mockOrders } from '@/data/mockData';
import { ArrowLeft, User, MapPin, Package, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
// import { Button } from '@/components/ui/button'; // Replaced with admin Button

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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>Order not found</p>
        <Link to="/admin/orders">
          <Button variant="outline">Back to Orders</Button>
        </Link>
      </div>
    );
  }

  // Helper styles mimicking the original tailwind layout but with inline styles or scss is better.
  // Using generic styles mapped from my mind or inline to save creating a module for just this page cleanup.
  const cardStyle = {
    backgroundColor: 'var(--card-bg)',
    borderRadius: '8px',
    boxShadow: 'var(--admin-shadow)',
    overflow: 'hidden',
    border: '1px solid var(--border-color)'
  };
  const headerStyle = {
    padding: '16px',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '24px' }}>
        <Link
          to="/admin/orders"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '16px' }}
        >
          <ArrowLeft size={16} />
          Back to Orders
        </Link>
        <PageHeader
          title={`Order ${order.id}`}
          description={`Placed on ${new Date(order.createdAt).toLocaleDateString()}`}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <StatusBadge status={order.paymentStatus} />
            <StatusBadge status={order.orderStatus} />
          </div>
        </PageHeader>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Main Content */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Order Items */}
          <div style={cardStyle}>
            <div style={headerStyle}>
              <Package size={16} className="text-muted-foreground" />
              <h3 style={{ fontWeight: 500 }}>Order Items</h3>
            </div>
            <div>
              {order.items.map((item) => (
                <div key={item.id} style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)' }}>
                  <div>
                    <p style={{ fontWeight: 500 }}>{item.name}</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{item.type}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: 500 }}>₹{item.price.toLocaleString()}</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: '16px', backgroundColor: 'rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 500 }}>Total</span>
              <span style={{ fontSize: '1.125rem', fontWeight: 600 }}>₹{order.totalAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Breakdown */}
          <div style={cardStyle}>
            <div style={headerStyle}>
              <CreditCard size={16} className="text-muted-foreground" />
              <h3 style={{ fontWeight: 500 }}>Payment Details</h3>
            </div>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                <span>₹{order.totalAmount.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                <span>Free</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Tax (GST 3%)</span>
                <span>₹{Math.round(order.totalAmount * 0.03).toLocaleString()}</span>
              </div>
              <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', fontWeight: 500 }}>
                <span>Grand Total</span>
                <span>₹{Math.round(order.totalAmount * 1.03).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Customer Info */}
          <div style={cardStyle}>
            <div style={headerStyle}>
              <User size={16} className="text-muted-foreground" />
              <h3 style={{ fontWeight: 500 }}>Customer</h3>
            </div>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ fontWeight: 500 }}>{order.customerName}</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{order.customerEmail}</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{order.customerPhone}</p>
            </div>
          </div>

          {/* Shipping Address */}
          <div style={cardStyle}>
            <div style={headerStyle}>
              <MapPin size={16} className="text-muted-foreground" />
              <h3 style={{ fontWeight: 500 }}>Shipping Address</h3>
            </div>
            <div style={{ padding: '16px' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{order.shippingAddress}</p>
              <p style={{ fontSize: '0.875rem', marginTop: '8px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Delivery:</span>{' '}
                <span style={{ fontWeight: 500 }}>{order.deliveryDays} days</span>
              </p>
            </div>
          </div>

          {/* Status Update */}
          <div style={cardStyle}>
            <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
              <h3 style={{ fontWeight: 500 }}>Update Status</h3>
            </div>
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
