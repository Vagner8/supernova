import { FilesReducerActions, FilesStrAction } from "admin/filesReducer";
import { Dispatch } from "react";
import { BottomSheetModals, Chips } from "UIKit";
import { v4 as uuidv4 } from 'uuid';

interface FilesSheetProps {
  files: File[] | null
  filesDispatch: Dispatch<FilesReducerActions>
}

export function FilesSheet({files, filesDispatch}: FilesSheetProps) {
  const onClick = (fileName: string) => () => {
    filesDispatch({type: FilesStrAction.DeleteOneFile, payload: { fileName }})
  }
  if (!files) return null
  return (
    <BottomSheetModals setting={{ show: Boolean(files.length) }}>
      {files.map((file) => (
        <Chips
          url={URL.createObjectURL(file)}
          key={uuidv4()}
          text={file.name}
          onClick={onClick}
        />
      ))}
    </BottomSheetModals>
  );
}
