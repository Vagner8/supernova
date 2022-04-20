import React from 'react';
import userEvent from '@testing-library/user-event';
import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../../App';
import '@testing-library/jest-dom';
import { mockData } from './mockData';
import { mockFetch } from './mockFunctions';

const EntireApp = (
  <MemoryRouter initialEntries={['/users']}>
    <App />
  </MemoryRouter>
);

describe.skip('No data', () => {
  beforeEach(() => {
    mockFetch({
      ...mockData,
      users: [],
    });
  });
  afterEach(() => {
    cleanup();
  });
  it('modal pops up if no data is fetched', async () => {
    render(EntireApp);
    await act(() => Promise.resolve());
    expect(screen.getByText(/KKKKK/i));
  });
});

describe('Module integration tests', () => {
  beforeEach(() => {
    mockFetch(mockData);
  });
  afterEach(() => {
    cleanup();
  });

  describe('TableActionType', () => {
    describe('SelectionUsers', () => {
      it('if all is clicked all users are selected', async () => {
        render(EntireApp);
        await act(() => Promise.resolve());
        await userEvent.click(screen.getByRole('checkbox', { name: 'all' }));
        await waitFor(() => {
          screen
            .getAllByRole('checkbox', { name: 'user-select' })
            .forEach((checkbox) => {
              expect(checkbox).toBeChecked();
            });
        });
        await userEvent.click(screen.getByRole('checkbox', { name: 'all' }));
        await waitFor(() => {
          screen
            .getAllByRole('checkbox', { name: 'user-select' })
            .forEach((checkbox) => {
              expect(checkbox).not.toBeChecked();
            });
        });
      });
    });
  });

  describe('DropListActionType', () => {
    describe('ToggleEditMode', () => {
      it('text "edit on" appears if only one user is selected', async () => {
        render(EntireApp);
        await act(() => Promise.resolve());
        userEvent.click(
          screen.getAllByRole('checkbox', { name: 'user-select' })[0],
        );
        await waitFor(() => {
          expect(screen.getByText(/edit on/i)).toBeInTheDocument();
        });
      });
      it('text "copy" not appears if all users are selected', async () => {
        render(EntireApp);
        await act(() => Promise.resolve());
        userEvent.click(screen.getByRole('checkbox', { name: 'all' }));
        await waitFor(() => {
          expect(screen.queryByText(/copy/i)).not.toBeInTheDocument();
        });
      });
      it('text "edit off" appears only if "edit on" is clicked', async () => {
        render(EntireApp);
        await act(() => Promise.resolve());
        await userEvent.click(
          screen.getAllByRole('checkbox', { name: 'user-select' })[0],
        );
        userEvent.click(screen.getByRole('button', { name: /edit/i }));
        await waitFor(() => {
          expect(screen.getByText(/edit off/i)).toBeInTheDocument();
        });
        await userEvent.click(screen.getByRole('button', { name: /edit/i }));
        await waitFor(() => {
          expect(screen.getByText(/edit on/i)).toBeInTheDocument();
        });
        await userEvent.click(screen.getByRole('button', { name: /new/i }));
        await waitFor(() => {
          expect(screen.queryByText(/edit off/i)).not.toBeInTheDocument();
        });
      });
      it('when page is loaded "new" emerges', async () => {
        render(EntireApp);
        await act(() => Promise.resolve());
        await waitFor(
          () => {
            expect(
              screen.getByRole('button', { name: /new/i }),
            ).toBeInTheDocument();
          },
          { timeout: 1000 },
        );
      });
    });
  });
});
