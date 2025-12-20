import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import styles from './ImageUpload.module.scss';
import { cn } from '@/lib/utils'; // Keep if we want to support external class injection

interface ImageUploadProps {
    value?: string;
    onChange: (url: string | undefined) => void;
    className?: string;
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleFile(file);
        }
    };

    const handleFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            onChange(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    return (
        <div className={cn(styles.container, className)}>
            {value ? (
                <div className={styles.previewContainer}>
                    <img src={value} alt="Upload preview" />
                    <button
                        onClick={() => onChange(undefined)}
                        className={styles.removeBtn}
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={cn(
                        styles.uploadArea,
                        isDragging && styles.dragging
                    )}
                >
                    <div className={styles.uploadContent}>
                        <div className={styles.iconWrapper}>
                            <ImageIcon className="h-6 w-6" />
                        </div>
                        <div className={styles.text}>
                            <div>Upload Image</div>
                            <div>
                                Drag & drop or click to browse
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className={styles.hiddenInput}
            />
        </div>
    );
}
