import { ReactNode, useEffect, useRef } from 'react';
import styles from './bottomSheetModals.module.css';

interface BottomSheetModalsProps {
  children: ReactNode | null;
  setting: { show: boolean };
}

export function BottomSheetModals({
  setting,
  children,
}: BottomSheetModalsProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    document.body.style.paddingBottom = ref.current.clientHeight + 'px';
  }, [setting]);
  return (
    <div
      ref={ref}
      className={`${styles.BottomSheetModals} ${
        setting.show ? styles.show : ''
      }`}
    >
      {children}
    </div>
  );
}
