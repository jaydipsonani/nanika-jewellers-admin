import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { FormSelect } from '@/components/admin/FormSelect';
import { Button } from '@/components/admin/Button';
import { mockJewellery } from '@/data/mockData';
import { Jewellery } from '@/types/admin';
import { Plus, Search, Pencil, Trash2, Gem } from 'lucide-react';
import { EditJewelleryModal } from '@/components/admin/Jewellery/EditJewelleryModal';
import { DeleteJewelleryModal } from '@/components/admin/Jewellery/DeleteJewelleryModal';
import { toast } from '@/hooks/use-toast';
import styles from './ManageJewellery.module.scss';

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

  // Modal states
  const [editItem, setEditItem] = useState<Jewellery | null>(null);
  const [deleteItem, setDeleteItem] = useState<Jewellery | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Mock data state (in real app this would be server state)
  const [data, setData] = useState<Jewellery[]>(mockJewellery);

  const filteredJewellery = data.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !filters.category || item.category === filters.category;
    const matchesMetal = !filters.metal || item.metalType === filters.metal;

    return matchesSearch && matchesCategory && matchesMetal;
  });

  const handleEdit = (item: Jewellery) => {
    setEditItem(item);
    setIsEditOpen(true);
  };

  const handleEditSave = (formData: any) => {
    console.log("Saving edited item:", formData);
    // Update local state mock
    setData(prev => prev.map(item => item.id === editItem?.id ? { ...item, ...formData } : item));
    setIsEditOpen(false);
    setEditItem(null);
    toast({
      title: "Jewellery Updated",
      description: "Item has been successfully updated."
    });
  };

  const handleDeleteClick = (item: Jewellery) => {
    setDeleteItem(item);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteItem) {
      setData(prev => prev.filter(item => item.id !== deleteItem.id));
      setIsDeleteOpen(false);
      setDeleteItem(null);
      toast({
        title: "Jewellery Deleted",
        description: "Item has been successfully deleted."
      });
    }
  };

  const columns = [
    {
      key: 'image',
      label: 'Image',
      render: (item: Jewellery) => (
        <div className={styles.imageWrapper}>
          {item.image ? (
            <img src={item.image} alt="" />
          ) : (
            <Gem size={20} className={styles.placeholder} />
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
        <span className={styles.metaInfo}>
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
        <div className={styles.actions}>
          <button
            className={`${styles.actionBtn} ${styles.edit}`}
            onClick={() => handleEdit(item)}
          >
            <Pencil size={16} />
          </button>
          <button
            className={`${styles.actionBtn} ${styles.delete}`}
            onClick={() => handleDeleteClick(item)}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <PageHeader title="Manage Jewellery" description="View and manage your jewellery inventory">
        <Link to="/admin/jewellery/add">
          <Button variant="admin">
            <Plus size={16} />
            Add Jewellery
          </Button>
        </Link>
      </PageHeader>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.grid}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
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

      {/* Modals */}
      <EditJewelleryModal
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        jewellery={editItem}
        onSave={handleEditSave}
      />

      <DeleteJewelleryModal
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDeleteConfirm}
      />

    </div>
  );
}
