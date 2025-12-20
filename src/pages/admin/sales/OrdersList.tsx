import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { FormSelect } from '@/components/admin/FormSelect';
import { FormInput } from '@/components/admin/FormInput';
import { mockOrders } from '@/data/mockData';
import { Order } from '@/types/admin';
import { FileText, Search } from 'lucide-react';
import styles from './Sales.module.scss'; // Reuse shared styles

const statusOptions = [
  { value: '', label: 'All Status' },
  { value: 'paid', label: 'Paid' },
  { value: 'pending', label: 'Pending' },
  { value: 'failed', label: 'Failed' },
];

const orderStatusOptions = [
  { value: '', label: 'All Orders' },
  { value: 'processing', label: 'Processing' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function OrdersList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    paymentStatus: '',
    orderStatus: '',
    dateFrom: '',
    dateTo: '',
  });

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPayment = !filters.paymentStatus || order.paymentStatus === filters.paymentStatus;
    const matchesOrder = !filters.orderStatus || order.orderStatus === filters.orderStatus;

    return matchesSearch && matchesPayment && matchesOrder;
  });

  const columns = [
    { key: 'id', label: 'Order ID' },
    { key: 'customerName', label: 'Customer' },
    {
      key: 'items',
      label: 'Items',
      render: (order: Order) => (
        <span style={{ color: 'var(--text-secondary)' }}>
          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
        </span>
      ),
    },
    {
      key: 'totalAmount',
      label: 'Amount',
      render: (order: Order) => (
        <span style={{ fontWeight: 500 }}>₹{order.totalAmount.toLocaleString()}</span>
      ),
    },
    {
      key: 'paymentStatus',
      label: 'Payment',
      render: (order: Order) => <StatusBadge status={order.paymentStatus} />,
    },
    {
      key: 'orderStatus',
      label: 'Order Status',
      render: (order: Order) => <StatusBadge status={order.orderStatus} />,
    },
    {
      key: 'deliveryDays',
      label: 'Delivery',
      render: (order: Order) => `${order.deliveryDays} days`,
    },
    {
      key: 'createdAt',
      label: 'Date',
      render: (order: Order) => new Date(order.createdAt).toLocaleDateString(),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (order: Order) => (
        <Link
          to={`/admin/orders/${order.id}`}
          className={styles.linkBtn}
        >
          <FileText size={16} />
          Invoice
        </Link>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <PageHeader title="Orders" description="Manage all customer orders" />

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.grid}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by order ID or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <FormSelect
            options={statusOptions}
            value={filters.paymentStatus}
            onChange={(e) => setFilters((prev) => ({ ...prev, paymentStatus: e.target.value }))}
          />
          <FormSelect
            options={orderStatusOptions}
            value={filters.orderStatus}
            onChange={(e) => setFilters((prev) => ({ ...prev, orderStatus: e.target.value }))}
          />
          <FormInput
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilters((prev) => ({ ...prev, dateFrom: e.target.value }))}
          />
        </div>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={filteredOrders} totalPages={1} />
    </div>
  );
}
