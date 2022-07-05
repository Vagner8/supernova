import { EventsReducerActions, EventsState } from 'admin/Events/eventsReducer';
import { Dispatch } from 'react';
import { Table } from 'UIKit';
import styles from './productTable.module.css';

interface ProductTableProps {
  products: EventsState['rows'];
  eventsDispatch: Dispatch<EventsReducerActions>;
}

export default function ProductTable({
  products,
  eventsDispatch,
}: ProductTableProps) {
  return (
    <div className={styles.ProductTable}>
      <div className={styles.right}>
        {/* <Table
          rows={products}
          sort={['avatar', 'name', 'surname', 'phone', 'email', 'rule']}
          eventsDispatch={eventsDispatch}
        /> */}
      </div>
      <div className={styles.left}></div>
    </div>
  );
}
