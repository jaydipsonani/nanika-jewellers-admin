import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/admin/PageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { FormSelect } from '@/components/admin/FormSelect';
import { Button } from '@/components/admin/Button';
import { mockDiamonds } from '@/data/mockData';
import { Diamond } from '@/types/admin';
import { Plus, Search, Pencil, Trash2, Diamond as DiamondIcon } from 'lucide-react';
import { EditDiamondModal } from '@/components/admin/Diamonds/EditDiamondModal';
import { DeleteDiamondModal } from '@/components/admin/Diamonds/DeleteDiamondModal';
import { toast } from '@/hooks/use-toast';
import styles from './ManageDiamonds.module.scss';

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
  { value: 'SI1', label: 'SI1' },
  { value: 'SI2', label: 'SI2' },
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

  // Modal states
  const [editItem, setEditItem] = useState<Diamond | null>(null);
  const [deleteItem, setDeleteItem] = useState<Diamond | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Mock data state
  const [data, setData] = useState<Diamond[]>(mockDiamonds);

  const filteredDiamonds = data.filter((diamond) => {
    const matchesSearch =
      diamond.certificateNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      diamond.color.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesShape = !filters.shape || diamond.shape === filters.shape;
    const matchesClarity = !filters.clarity || diamond.clarity === filters.clarity;
    const matchesColor = !filters.color || diamond.color === filters.color;

    return matchesSearch && matchesShape && matchesClarity && matchesColor;
  });

  const handleEdit = (item: Diamond) => {
    setEditItem(item);
    setIsEditOpen(true);
  };

  const handleEditSave = (formData: any) => {
    console.log("Saving edited diamond:", formData);
    setData(prev => prev.map(item => item.id === editItem?.id ? { ...item, ...formData } : item));
    setIsEditOpen(false);
    setEditItem(null);
    toast({
      title: "Diamond Updated",
      description: "Details have been successfully updated."
    });
  };

  const handleDeleteClick = (item: Diamond) => {
    setDeleteItem(item);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteItem) {
      setData(prev => prev.filter(item => item.id !== deleteItem.id));
      setIsDeleteOpen(false);
      setDeleteItem(null);
      toast({
        title: "Diamond Deleted",
        description: "Item has been successfully deleted."
      });
    }
  };

  const columns = [
    {
      key: 'image',
      label: 'Image',
      render: (diamond: Diamond) => (
        <div className={styles.imageWrapper}>
          {diamond.image ? (
            <img src={diamond.image} alt="" />
          ) : (
            <DiamondIcon size={20} className={styles.placeholder} />
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
        <div className={styles.actions}>
          <button
            className={`${styles.actionBtn} ${styles.edit}`}
            onClick={() => handleEdit(diamond)}
          >
            <Pencil size={16} />
          </button>
          <button
            className={`${styles.actionBtn} ${styles.delete}`}
            onClick={() => handleDeleteClick(diamond)}
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <PageHeader title="Manage Diamonds" description="View and manage your diamond inventory">
        <Link to="/admin/diamonds/add">
          <Button variant="admin">
            <Plus size={16} />
            Add Diamond
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
              placeholder="Search by certificate or color..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
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

      {/* Modals */}
      <EditDiamondModal
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        diamond={editItem}
        onSave={handleEditSave}
      />

      <DeleteDiamondModal
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
