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
        <span className="text-muted-foreground">
          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
        </span>
      ),
    },
    {
      key: 'totalAmount',
      label: 'Amount',
      render: (order: Order) => (
        <span className="font-medium">₹{order.totalAmount.toLocaleString()}</span>
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
          className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
        >
          <FileText className="h-4 w-4" />
          Invoice
        </Link>
      ),
    },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader title="Orders" description="Manage all customer orders" />

      {/* Filters */}
      <div className="bg-card rounded-lg p-4 admin-shadow mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by order ID or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
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
