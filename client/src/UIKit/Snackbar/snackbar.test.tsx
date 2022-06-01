import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Snackbar, SnackbarProps } from './Snackbar';

type TestProps = Omit<SnackbarProps, 'adminDispatch'>;

const SnackbarComponent = ({ status, message, filed }: TestProps) => (
  <Snackbar
    filed={filed}
    status={status}
    message={message}
    adminDispatch={jest.fn}
  />
);

describe('Snackbar', () => {
  afterEach(() => {
    cleanup();
  });
  it('has Snackbar class', () => {
    const { container } = render(
      SnackbarComponent({
        status: 'ok',
        message: 'message',
        filed: null,
      }),
    );
    expect(container.querySelector('.Snackbar')).toBeInTheDocument();
  });
  it('gets ok type', () => {
    const { container } = render(
      SnackbarComponent({
        status: 'ok',
        message: 'message',
        filed: null,
      }),
    );
    expect(container.querySelector('.ok')).toBeInTheDocument();
    expect(screen.getByText(/task_alt/i)).toBeInTheDocument();
  });
  it('gets error type', () => {
    const { container } = render(
      SnackbarComponent({
        status: 'error',
        message: 'message',
        filed: null,
      }),
    );
    expect(container.querySelector('.error')).toBeInTheDocument();
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
  it('gets warning type', () => {
    const { container } = render(
      SnackbarComponent({
        status: 'warning',
        message: 'message',
        filed: null,
      }),
    );
    expect(container.querySelector('.warning')).toBeInTheDocument();
    expect(screen.getByText(/warning/i)).toBeInTheDocument();
  });
  it('no appears if gets filed', () => {
    const { container } = render(
      SnackbarComponent({
        status: 'error',
        message: 'message',
        filed: 'filed',
      }),
    );
    expect(container.querySelector('.Snackbar')).not.toBeInTheDocument();
  });
});
