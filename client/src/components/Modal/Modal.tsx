import { useLayoutEffect, useRef, useState } from 'react';
import M from 'materialize-css';
import styles from './Modal.module.sass';

export const enum ModalType {
  NoData = 'NoData',
}

interface Props {
  type: ModalType;
}

export function Modal({ type }: Props) {
  const [content, setContent] = useState();
  const ref = useRef<HTMLDivElement>(null);
  // useLayoutEffect(() => {
  //   if (ref.current) {
  //     M.Modal.init(ref.current).open();
  //   }
  // }, []);
  return (
    <div className={styles.Modal_Component}>
      <div ref={ref} id="modal1" className="modal">
        <div className="modal-content">
          <h4>Modal Header</h4>
          <p>A bunch of text</p>
        </div>
        <div className="modal-footer">
          <a
            href="#!"
            className="modal-close waves-effect waves-green btn-flat"
          >
            Agree
          </a>
        </div>
      </div>
    </div>
  );
}
