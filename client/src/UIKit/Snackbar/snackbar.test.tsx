import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Snackbar } from './Snackbar';
import { Loading } from 'admin/adminReducer';

const SnackbarComponent = (loading: Loading) => (
  <Snackbar loading={loading} adminDispatch={jest.fn} />
);

describe('Snackbar', () => {
  afterEach(() => {
    cleanup();
  });
  it('has Snackbar class', () => {
    const { container } = render(
      SnackbarComponent({
        type: 'ok',
        message: 'message',
      }),
    );
    expect(container.querySelector('.Snackbar')).toBeInTheDocument();
  });
  it('gets ok type', () => {
    const { container } = render(
      SnackbarComponent({
        type: 'ok',
        message: 'message',
      }),
    );
    expect(container.querySelector('.ok')).toBeInTheDocument();
    expect(screen.getByText(/task_alt/i)).toBeInTheDocument();
  });
  it('gets error type', () => {
    const { container } = render(
      SnackbarComponent({
        type: 'error',
        message: 'message',
      }),
    );
    expect(container.querySelector('.error')).toBeInTheDocument();
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
  it('gets warning type', () => {
    const { container } = render(
      SnackbarComponent({
        type: 'warning',
        message: 'message',
      }),
    );
    expect(container.querySelector('.warning')).toBeInTheDocument();
    expect(screen.getByText(/warning/i)).toBeInTheDocument();
  });
});
