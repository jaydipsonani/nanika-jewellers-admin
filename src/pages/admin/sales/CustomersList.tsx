import { useState } from 'react';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { mockCustomers } from '@/data/mockData';
import { Customer } from '@/types/admin';
import { Search, Mail, Phone } from 'lucide-react';

export default function CustomersList() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = mockCustomers.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const columns = [
    {
      key: 'name',
      label: 'Customer',
      render: (customer: Customer) => (
        <div>
          <p className="font-medium">{customer.name}</p>
          <p className="text-xs text-muted-foreground">{customer.email}</p>
        </div>
      ),
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (customer: Customer) => (
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Phone className="h-3.5 w-3.5" />
          {customer.phone}
        </div>
      ),
    },
    {
      key: 'totalOrders',
      label: 'Orders',
      render: (customer: Customer) => customer.totalOrders,
    },
    {
      key: 'totalSpent',
      label: 'Total Spent',
      render: (customer: Customer) => (
        <span className="font-medium">₹{customer.totalSpent.toLocaleString()}</span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Joined',
      render: (customer: Customer) => new Date(customer.createdAt).toLocaleDateString(),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (customer: Customer) => (
        <a
          href={`mailto:${customer.email}`}
          className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
        >
          <Mail className="h-4 w-4" />
          Email
        </a>
      ),
    },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader title="Customers" description="View and manage your customers" />

      {/* Search */}
      <div className="bg-card rounded-lg p-4 admin-shadow mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={filteredCustomers} totalPages={1} />
    </div>
  );
}
