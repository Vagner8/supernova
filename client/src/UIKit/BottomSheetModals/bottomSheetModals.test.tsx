import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BottomSheetModals } from './BottomSheetModals';
import { ReactNode } from 'react';

const BottomSheetModalsComponent = (
  show: boolean,
  children: ReactNode | null,
) => <BottomSheetModals setting={{ show }}>{children}</BottomSheetModals>;

describe('BottomSheetModals', () => {
  afterEach(() => {
    cleanup();
  });
  it('has BottomSheetModals class', () => {
    const { container } = render(BottomSheetModalsComponent(true, <div></div>));
    expect(container.querySelector('.BottomSheetModals')).toBeInTheDocument();
    expect(container.querySelector('.BottomSheetModals')).toHaveClass('show');
  });
  it('not displays if has no ReactNode', () => {
    const { container } = render(
      BottomSheetModalsComponent(false, <div></div>),
    );
    expect(container.querySelector('.BottomSheetModals')).not.toHaveClass(
      'show',
    );
  });
});
