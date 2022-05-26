import { uploadFiles } from 'firebaseSender';
import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Icon, Circular } from 'UIKit';
import styles from './fileInput.module.css';

interface FileInputProps {
  multiple: boolean;
}

export function FileInput({ multiple }: FileInputProps) {
  const [files, setFiles] = useState<File[]>();
  const [canSend, setCanSend] = useState(false);
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    if (!files) return
    if (files.length === 0) setCanSend(false)
  }, [files])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
    setCanSend(true);
  };

  const sendFiles = async () => {
    if (!files) return;
    setFiles([])
    setIsSending(true)
    const res = await uploadFiles(files);
    setIsSending(false)
  };

  const deleteOne = (index: number) => () => {
    if (!files) return;
    setFiles(files.filter((_, i) => i !== index));
  };

  const deleteAll = () => setFiles([])
  const setTitle = () => canSend ? 'send' : 'file'

  return (
    <div className={styles.FileInput}>
      <Button
        disabled={isSending}
        clickHandler={sendFiles}
        title={isSending ? '' : setTitle()}
        type="button"
      >
        {canSend ? null : (
          <input
            multiple={multiple}
            onChange={onChange}
            className={styles.input}
            type="file"
          />
        )}
        {isSending? <Circular color='white' /> : null}
      </Button>
      <Chips deleteOne={deleteOne} deleteAll={deleteAll} files={files} />
    </div>
  );
}

interface EraserProps {
  files: File[] | undefined;
  onClick: () => void;
}

function Eraser({ onClick, files }: EraserProps) {
  if (!files) return null;
  if (files.length <= 2) return null;
  return (
    <button className={styles.Eraser} onClick={onClick}>
      <Icon className={styles.delete} icon="delete" />
    </button>
  );
}

interface ChipsProps {
  files: File[] | undefined;
  deleteOne: (index: number) => () => void;
  deleteAll: () => void
}

function Chips({ files, deleteOne, deleteAll }: ChipsProps) {
  if (!files) return null;
  return (
    <div className={styles.file_names}>
      {files.map((file, index) => (
        <div className={styles.small} key={file.name}>
          <div className={styles.wrap_file_names}>
            {file.name}
            <button onClick={deleteOne(index)}>
              <Icon className={styles.icon} icon="cancel" />
            </button>
          </div>
        </div>
      ))}
      <Eraser onClick={deleteAll} files={files} />
    </div>
  );
}
