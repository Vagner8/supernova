import { deleteOneFile, EventsReducerActions } from "admin/Events/eventsReducer";
import { Dispatch, memo } from "react";
import { BottomSheetModals, Chip } from "UIKit";

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
        <Chip
          file={file}
          key={file.name}
          text={file.name}
          onClick={onClick}
        />
      ))}
    </BottomSheetModals>
  );
}

export const MemoFilesSheet = memo(FilesSheet)
