import { ChangeEvent } from 'react';
import { Button } from 'UIKit';
import styles from './fileInput.module.css';

interface FileInputProps {
  multiple: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function FileInput({ multiple, onChange }: FileInputProps) {
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
          onChange={onChange}
        />
      </Button>
    </div>
  );
}
