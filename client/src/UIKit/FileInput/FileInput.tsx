import { ChangeEvent } from 'react';
import { Button } from 'UIKit';
import styles from './fileInput.module.css';

interface FileInputProps {
  multiple: boolean;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export function FileInput({
  multiple,
  name,
  onChange,
  className,
}: FileInputProps) {
  return (
    <div className={`${styles.FileInput} ${className}`}>
      <Button
        title={multiple ? 'pick files' : 'pick file'}
        disabled={false}
        type="button"
      >
        <input
          data-point-name="imgs"
          multiple={multiple}
          className={styles.input}
          type="file"
          name={name}
          onChange={onChange}
        />
      </Button>
    </div>
  );
}
