import '@testing-library/jest-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown } from './Dropdown';

const list = ['new', 'edit', 'copy', 'delete'];

const DropdownComponent = (saveButton: boolean) => (
  <Dropdown saveButton={saveButton} list={list} handleTarget={jest.fn} />
);

describe('Dropdown', () => {
  afterEach(() => {
    cleanup();
  });
  it('has Dropdown class', () => {
    const { container } = render(DropdownComponent(false));
    expect(container.querySelector('.Dropdown')).toBeInTheDocument();
  });
  it('clicks, menu opens', async () => {
    render(DropdownComponent(false));
    userEvent.click(screen.getByRole('button', { name: /events/i }));
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /new/i })).toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: /delete/i }),
      ).toBeInTheDocument(),
    );
  });
  it('gets saveButton true, has saveButton', async () => {
    render(DropdownComponent(true));
    userEvent.click(screen.getByRole('button', { name: /events/i }));
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument(),
    );
  });
});
