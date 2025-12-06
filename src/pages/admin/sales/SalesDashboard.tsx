import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/admin/PageHeader';
import { StatsCard } from '@/components/admin/StatsCard';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { mockOrders, mockSalesStats } from '@/data/mockData';
import { Order } from '@/types/admin';
import { ShoppingCart, DollarSign, Package, FileText } from 'lucide-react';

const orderColumns = [
  { key: 'id', label: 'Order ID' },
  { key: 'customerName', label: 'Customer' },
  {
    key: 'items',
    label: 'Items',
    render: (order: Order) => order.items.length,
  },
  {
    key: 'totalAmount',
    label: 'Amount',
    render: (order: Order) => `₹${order.totalAmount.toLocaleString()}`,
  },
  {
    key: 'paymentStatus',
    label: 'Payment',
    render: (order: Order) => <StatusBadge status={order.paymentStatus} />,
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
        View
      </Link>
    ),
  },
];

export default function SalesDashboard() {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Sales Dashboard"
        description="Overview of your sales performance"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatsCard
          title="Total Orders"
          value={mockSalesStats.totalOrders}
          icon={ShoppingCart}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="Total Revenue"
          value={`₹${(mockSalesStats.totalRevenue / 100000).toFixed(1)}L`}
          icon={DollarSign}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatsCard
          title="Items Sold"
          value={mockSalesStats.totalItemsSold}
          icon={Package}
          trend={{ value: 15.3, isPositive: true }}
        />
      </div>

      {/* Recent Orders */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium text-foreground">Recent Orders</h2>
        <DataTable columns={orderColumns} data={mockOrders} />
      </div>
    </div>
  );
}
