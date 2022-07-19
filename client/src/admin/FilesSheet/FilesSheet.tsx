import { EventsReducerActions, EventsState } from 'admin/Events/eventsState';
import { useEventsDispatch } from 'hooks';
import { Dispatch, memo } from 'react';
import { BottomSheetModals, Chip } from 'UIKit';

interface FilesSheetProps {
  mediaFiles: EventsState['mediaFiles'];
  eventsDispatch: Dispatch<EventsReducerActions>;
}

export function FilesSheet({ mediaFiles, eventsDispatch }: FilesSheetProps) {
  const eventsAction = useEventsDispatch(eventsDispatch);
  const onClick = (name?: string) => () => {
    if (!name) return
    eventsAction.deleteOneMediaFile({ name });
  };
  return (
    <BottomSheetModals setting={{ show: Boolean(mediaFiles.length) }}>
      {mediaFiles.map((mediaFile) =>
        mediaFile.files.map((file) => (
          <Chip
            file={file}
            key={file.name}
            text={file.name}
            onClick={onClick}
          />
        )),
      )}
    </BottomSheetModals>
  );
}

export const MemoFilesSheet = memo(FilesSheet);
