import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { FormInput } from '@/components/admin/FormInput';
import { FormSelect } from '@/components/admin/FormSelect';
import { Button } from '@/components/ui/button';
import { mockDiamonds } from '@/data/mockData';
import { Diamond } from '@/types/admin';
import { Plus, Search, Pencil, Trash2, Diamond as DiamondIcon } from 'lucide-react';

const shapeOptions = [
  { value: '', label: 'All Shapes' },
  { value: 'round', label: 'Round' },
  { value: 'oval', label: 'Oval' },
  { value: 'princess', label: 'Princess' },
  { value: 'cushion', label: 'Cushion' },
  { value: 'emerald', label: 'Emerald' },
];

const clarityOptions = [
  { value: '', label: 'All Clarity' },
  { value: 'IF', label: 'IF' },
  { value: 'VVS1', label: 'VVS1' },
  { value: 'VVS2', label: 'VVS2' },
  { value: 'VS1', label: 'VS1' },
  { value: 'VS2', label: 'VS2' },
];

const colorOptions = [
  { value: '', label: 'All Colors' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
  { value: 'F', label: 'F' },
  { value: 'G', label: 'G' },
  { value: 'H', label: 'H' },
];

export default function ManageDiamonds() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    shape: '',
    clarity: '',
    color: '',
  });

  const filteredDiamonds = mockDiamonds.filter((diamond) => {
    const matchesSearch =
      diamond.certificateNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      diamond.color.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesShape = !filters.shape || diamond.shape === filters.shape;
    const matchesClarity = !filters.clarity || diamond.clarity === filters.clarity;
    const matchesColor = !filters.color || diamond.color === filters.color;

    return matchesSearch && matchesShape && matchesClarity && matchesColor;
  });

  const columns = [
    {
      key: 'image',
      label: 'Image',
      render: (diamond: Diamond) => (
        <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center">
          {diamond.image ? (
            <img src={diamond.image} alt="" className="w-full h-full object-cover rounded-md" />
          ) : (
            <DiamondIcon className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      render: (diamond: Diamond) => (
        <span className="capitalize">{diamond.category.replace('-', ' ')}</span>
      ),
    },
    {
      key: 'shape',
      label: 'Shape',
      render: (diamond: Diamond) => <span className="capitalize">{diamond.shape}</span>,
    },
    { key: 'color', label: 'Color' },
    { key: 'clarity', label: 'Clarity' },
    {
      key: 'carat',
      label: 'Carat',
      render: (diamond: Diamond) => `${diamond.carat} ct`,
    },
    { key: 'certificateNo', label: 'Certificate' },
    {
      key: 'price',
      label: 'Price',
      render: (diamond: Diamond) => `₹${diamond.price.toLocaleString()}`,
    },
    {
      key: 'status',
      label: 'Status',
      render: (diamond: Diamond) => <StatusBadge status={diamond.status} />,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (diamond: Diamond) => (
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
      <PageHeader title="Manage Diamonds" description="View and manage your diamond inventory">
        <Link to="/admin/diamonds/add">
          <Button variant="admin">
            <Plus className="h-4 w-4" />
            Add Diamond
          </Button>
        </Link>
      </PageHeader>

      {/* Filters */}
      <div className="bg-card rounded-lg p-4 admin-shadow mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by certificate or color..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <FormSelect
            options={shapeOptions}
            value={filters.shape}
            onChange={(e) => setFilters((prev) => ({ ...prev, shape: e.target.value }))}
          />
          <FormSelect
            options={colorOptions}
            value={filters.color}
            onChange={(e) => setFilters((prev) => ({ ...prev, color: e.target.value }))}
          />
          <FormSelect
            options={clarityOptions}
            value={filters.clarity}
            onChange={(e) => setFilters((prev) => ({ ...prev, clarity: e.target.value }))}
          />
        </div>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={filteredDiamonds} totalPages={1} />
    </div>
  );
}
