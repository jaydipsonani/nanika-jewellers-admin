import { useState } from 'react';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { mockCustomers } from '@/data/mockData';
import { Customer } from '@/types/admin';
import { Search, Mail, Phone } from 'lucide-react';
import styles from './Sales.module.scss';

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
          <p style={{ fontWeight: 500 }}>{customer.name}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{customer.email}</p>
        </div>
      ),
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (customer: Customer) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
          <Phone size={14} />
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
        <span style={{ fontWeight: 500 }}>₹{customer.totalSpent.toLocaleString()}</span>
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
          className={styles.linkBtn}
        >
          <Mail size={16} />
          Email
        </a>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <PageHeader title="Customers" description="View and manage your customers" />

      {/* Search */}
      <div className={styles.filters}>
        <div style={{ maxWidth: '400px' }} className={styles.searchWrapper}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={filteredCustomers} totalPages={1} />
    </div>
  );
}
