import { AdminReducerActions } from 'admin/adminState';
import { EventsReducerActions, EventsState } from 'admin/Events/eventsState';
import { Dispatch } from 'react';
import { Table } from 'UIKit';
import styles from './productTable.module.css';
import { useFetchToGetProductsForTable } from './productTableHooks/useFetchToGetProductsForTable';

interface ProductTableProps {
  products: EventsState['tableRows'];
  eventsDispatch: Dispatch<EventsReducerActions>;
  adminDispatch: Dispatch<AdminReducerActions>,
}

export default function ProductTable({
  products,
  eventsDispatch,
  adminDispatch,
}: ProductTableProps) {
  useFetchToGetProductsForTable(eventsDispatch, adminDispatch)
  return (
    <div className={styles.ProductTable}>
      <div className={styles.right}>
        <Table
          rows={products}
          eventsDispatch={eventsDispatch}
        />
      </div>
      <div className={styles.left}></div>
    </div>
  );
}
