import { ChangeEvent } from 'react';
import { Button } from 'UIKit';
import styles from './fileInput.module.css';

interface FileInputProps {
  multiple: boolean;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function FileInput({ multiple, name, onChange }: FileInputProps) {
  return (
    <div className={styles.FileInput}>
      <Button
        title={multiple ? 'pick files' : 'pick file'}
        disabled={false}
        type="button"
      >
        <input
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
