import '@testing-library/jest-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dropdown } from './Dropdown';

const list = ['new', 'edit', 'copy', 'delete'];

const DropdownComponent = () => <Dropdown list={list} handleTarget={jest.fn} />;

describe('Dropdown', () => {
  afterEach(() => {
    cleanup();
  });
  it('has Dropdown class', () => {
    const { container } = render(DropdownComponent());
    expect(container.querySelector('.Dropdown')).toBeInTheDocument();
  });
  it('clicks, menu opens', async () => {
    render(DropdownComponent());
    userEvent.click(screen.getByRole('button', { name: /events/i }));
    await waitFor(() =>
    expect(
      screen.getByRole('button', { name: /new/i }),
    ).toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: /delete/i }),
      ).toBeInTheDocument(),
    );
  });
});
