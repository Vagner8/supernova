import { AdminReducerActions, AdminStrAction } from 'admin/adminReducer';
import { FilesReducerActions, FilesStrAction } from 'admin/filesReducer';
import { Dispatch } from 'react';
import { Dropdown } from 'UIKit';
import styles from './events.module.css';
import {
  DependentState,
  EventNames,
  EventsReducerActions,
  EventsStrAction,
} from './eventsReducer';

interface EventsProps {
  events: string[];
  editMode: boolean;
  dependentState: DependentState | null;
  saveButton: boolean;
  eventsDispatch: Dispatch<EventsReducerActions>;
  adminDispatch: Dispatch<AdminReducerActions>;
  filesDispatch: Dispatch<FilesReducerActions>
}

export function Events({
  events,
  editMode,
  dependentState,
  saveButton,
  eventsDispatch,
  adminDispatch,
  filesDispatch,
}: EventsProps) {
  const handleTarget = (target: HTMLButtonElement) => {
    if (!target.textContent) return;
    const eventName = target.textContent as EventNames;
    if (eventName === EventNames.Edit || eventName === EventNames.EditOff) {
      eventsDispatch({
        type: EventsStrAction.SetEditMode,
      });
    }
    if (eventName === EventNames.EditOff) {
      filesDispatch({ type: FilesStrAction.DeleteAllFiles });
    }
    switch (dependentState) {
      case 'adminState':
        if (eventName === EventNames.EditOff) {
          eventsDispatch({
            type: EventsStrAction.SwitchSaveButton,
            payload: { saveButton: false },
          });
        }
    }
  };

  return (
    <div className={styles.Events}>
      <Dropdown
        saveButton={saveButton}
        handleTarget={handleTarget}
        list={events}
      />
    </div>
  );
}
