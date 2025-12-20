import { useParams, Link } from 'react-router-dom';
import { PageHeader } from '@/components/admin/PageHeader';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { FormSelect } from '@/components/admin/FormSelect';
import { Button } from '@/components/admin/Button';
import { mockOrders } from '@/data/mockData';
import { ArrowLeft, User, MapPin, Package, CreditCard } from 'lucide-react';
import styles from './Sales.module.scss';

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

  return (
    <div className={styles.container}>
      <div style={{ marginBottom: '24px' }}>
        <Link
          to="/admin/orders"
          className={styles.backLink}
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

      <div className={styles.detailsGrid}>
        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Order Items */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <Package size={16} />
              <h3>Order Items</h3>
            </div>
            <div>
              {order.items.map((item) => (
                <div key={item.id} className={styles.orderItem}>
                  <div className={styles.itemMeta}>
                    <p>{item.name}</p>
                    <p>{item.type}</p>
                  </div>
                  <div className={styles.itemPrice}>
                    <p>₹{item.price.toLocaleString()}</p>
                    <p>Qty: {item.quantity}</p>
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
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <CreditCard size={16} />
              <h3>Payment Details</h3>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>₹{order.totalAmount.toLocaleString()}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Tax (GST 3%)</span>
                <span>₹{Math.round(order.totalAmount * 0.03).toLocaleString()}</span>
              </div>
              <div className={styles.totalRow}>
                <span>Grand Total</span>
                <span>₹{Math.round(order.totalAmount * 1.03).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Customer Info */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <User size={16} />
              <h3>Customer</h3>
            </div>
            <div className={styles.cardContent}>
              <div className={styles.infoRow}>
                <p>Name</p>
                <p>{order.customerName}</p>
              </div>
              <div className={styles.infoRow}>
                <p>Email</p>
                <p>{order.customerEmail}</p>
              </div>
              <div className={styles.infoRow}>
                <p>Phone</p>
                <p>{order.customerPhone}</p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <MapPin size={16} />
              <h3>Shipping Address</h3>
            </div>
            <div className={styles.cardContent}>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{order.shippingAddress}</p>
              <div className={styles.infoRow}>
                <p>Delivery Estimate</p>
                <p>{order.deliveryDays} days</p>
              </div>
            </div>
          </div>

          {/* Status Update */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h3>Update Status</h3>
            </div>
            <div className={styles.cardContent}>
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
