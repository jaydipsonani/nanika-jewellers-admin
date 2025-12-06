import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { FormSelect } from '@/components/admin/FormSelect';
import { Button } from '@/components/ui/button';
import { mockJewellery } from '@/data/mockData';
import { Jewellery } from '@/types/admin';
import { Plus, Search, Pencil, Trash2, Gem } from 'lucide-react';

const categoryOptions = [
  { value: '', label: 'All Categories' },
  { value: 'ring', label: 'Ring' },
  { value: 'earring', label: 'Earring' },
  { value: 'pendant', label: 'Pendant' },
  { value: 'bracelet', label: 'Bracelet' },
  { value: 'necklace', label: 'Necklace' },
  { value: 'watch', label: 'Watch' },
];

const metalOptions = [
  { value: '', label: 'All Metals' },
  { value: '9K', label: '9K Gold' },
  { value: '14K', label: '14K Gold' },
  { value: '18K', label: '18K Gold' },
];

export default function ManageJewellery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    metal: '',
  });

  const filteredJewellery = mockJewellery.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !filters.category || item.category === filters.category;
    const matchesMetal = !filters.metal || item.metalType === filters.metal;

    return matchesSearch && matchesCategory && matchesMetal;
  });

  const columns = [
    {
      key: 'image',
      label: 'Image',
      render: (item: Jewellery) => (
        <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center">
          {item.image ? (
            <img src={item.image} alt="" className="w-full h-full object-cover rounded-md" />
          ) : (
            <Gem className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (item: Jewellery) => <span className="capitalize">{item.category}</span>,
    },
    { key: 'title', label: 'Title' },
    {
      key: 'metal',
      label: 'Metal',
      render: (item: Jewellery) => (
        <span>
          {item.metalType} {item.metalColor.replace('-', ' ')}
        </span>
      ),
    },
    {
      key: 'productWeight',
      label: 'Weight',
      render: (item: Jewellery) => `${item.productWeight}g`,
    },
    {
      key: 'price',
      label: 'Price',
      render: (item: Jewellery) => `₹${item.price.toLocaleString()}`,
    },
    {
      key: 'status',
      label: 'Status',
      render: (item: Jewellery) => <StatusBadge status={item.status} />,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (item: Jewellery) => (
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-md hover:bg-muted admin-transition">
            <Pencil className="h-4 w-4 text-muted-foreground" />
          </button>
          <button className="p-1.5 rounded-md hover:bg-destructive/10 admin-transition">
            <Trash2 className="h-4 w-4 text-destructive" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader title="Manage Jewellery" description="View and manage your jewellery inventory">
        <Link to="/admin/jewellery/add">
          <Button variant="admin">
            <Plus className="h-4 w-4" />
            Add Jewellery
          </Button>
        </Link>
      </PageHeader>

      {/* Filters */}
      <div className="bg-card rounded-lg p-4 admin-shadow mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <FormSelect
            options={categoryOptions}
            value={filters.category}
            onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
          />
          <FormSelect
            options={metalOptions}
            value={filters.metal}
            onChange={(e) => setFilters((prev) => ({ ...prev, metal: e.target.value }))}
          />
        </div>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={filteredJewellery} totalPages={1} />
    </div>
  );
}
