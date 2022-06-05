import { deleteOneFile, EventsReducerActions } from "admin/Events/eventsReducer";
import { Dispatch } from "react";
import { BottomSheetModals, Chips } from "UIKit";
import { v4 as uuidv4 } from 'uuid';

interface FilesSheetProps {
  files: File[] | null
  eventsDispatch: Dispatch<EventsReducerActions>
}

export function FilesSheet({files, eventsDispatch}: FilesSheetProps) {
  const onClick = (fileName: string) => () => {
    deleteOneFile(eventsDispatch, fileName)
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
