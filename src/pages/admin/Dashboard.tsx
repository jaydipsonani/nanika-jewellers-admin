import { PageHeader } from '@/components/admin/PageHeader';
import { StatsCard } from '@/components/admin/StatsCard'; // Ensure StatsCard is also refactored? 
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { mockOrders, mockSalesStats } from '@/data/mockData';
import { ShoppingCart, DollarSign, Package, TrendingUp } from 'lucide-react';
import { Order } from '@/types/admin';

const recentOrderColumns = [
  { key: 'id', label: 'Order ID' },
  { key: 'customerName', label: 'Customer' },
  {
    key: 'totalAmount',
    label: 'Amount',
    render: (order: Order) => `₹${order.totalAmount.toLocaleString()}`,
  },
  {
    key: 'paymentStatus',
    label: 'Status',
    render: (order: Order) => <StatusBadge status={order.paymentStatus} />,
  },
  {
    key: 'createdAt',
    label: 'Date',
    render: (order: Order) => new Date(order.createdAt).toLocaleDateString(),
  },
];

export default function Dashboard() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's what's happening with your store."
      />

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '32px' }}>
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
        <StatsCard
          title="Avg. Order Value"
          value={`₹${Math.round(mockSalesStats.totalRevenue / mockSalesStats.totalOrders).toLocaleString()}`}
          icon={TrendingUp}
          trend={{ value: 3.1, isPositive: false }}
        />
      </div>

      {/* Recent Orders */}
      <div>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 500, marginBottom: '16px' }}>Recent Orders</h2>
        <DataTable columns={recentOrderColumns} data={mockOrders} />
      </div>
    </div>
  );
}
