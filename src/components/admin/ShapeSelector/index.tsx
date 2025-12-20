import { cn } from '@/lib/utils';
import { DiamondShape } from '@/types/admin';
import styles from './ShapeSelector.module.scss';

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
    className?: string; // allow external override of container
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
            // User request: "categeary shapes for diamond and jewellary doe one time one not multiple selected"
            // Wait, "shapes ... not multiple selected".
            // But mock data says "shapes: DiamondShape[]".
            // `AddDiamond` uses `useState<DiamondShape[]>([])`.
            // I should enforce single select if passed false, but maybe default to false now based on user request?
            // "categeary shapes for diamond and jewellary doe one time one not multiple selected"
            // Suggests defaults should be single select.
            // I'll keep the prop but maybe change usages to single select?
            // I'll make logic handle single select correctly.
            onChange([shape]);
        }
    };

    return (
        <div className={cn(styles.container, className)}>
            {shapes.map((shape) => (
                <button
                    key={shape.value}
                    type="button"
                    onClick={() => handleClick(shape.value)}
                    className={cn(
                        styles.shapeBtn,
                        value.includes(shape.value) && styles.active
                    )}
                >
                    {shape.label}
                </button>
            ))}
        </div>
    );
}
