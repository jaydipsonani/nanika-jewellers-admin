import { cn } from '@/lib/utils';
import { DiamondShape } from '@/types/admin';

const shapes: { value: DiamondShape; label: string }[] = [
  { value: 'asscher', label: 'Asscher' },
  { value: 'cushion', label: 'Cushion' },
  { value: 'emerald', label: 'Emerald' },
  { value: 'heart', label: 'Heart' },
  { value: 'marquise', label: 'Marquise' },
  { value: 'oval', label: 'Oval' },
  { value: 'pear', label: 'Pear' },
  { value: 'princess', label: 'Princess' },
  { value: 'radiant', label: 'Radiant' },
  { value: 'round', label: 'Round' },
];

interface ShapeSelectorProps {
  value: DiamondShape[];
  onChange: (shapes: DiamondShape[]) => void;
  multiple?: boolean;
  className?: string;
}

export function ShapeSelector({ value, onChange, multiple = true, className }: ShapeSelectorProps) {
  const handleClick = (shape: DiamondShape) => {
    if (multiple) {
      if (value.includes(shape)) {
        onChange(value.filter((s) => s !== shape));
      } else {
        onChange([...value, shape]);
      }
    } else {
      onChange([shape]);
    }
  };

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {shapes.map((shape) => (
        <button
          key={shape.value}
          type="button"
          onClick={() => handleClick(shape.value)}
          className={cn(
            'px-3 py-1.5 rounded-md text-sm font-medium border admin-transition',
            value.includes(shape.value)
              ? 'bg-foreground text-background border-foreground'
              : 'bg-background text-foreground border-border hover:border-foreground/50'
          )}
        >
          {shape.label}
        </button>
      ))}
    </div>
  );
}
