import '@testing-library/jest-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { Admin } from './Admin';

function mockFetch() {
  window.fetch = jest.fn().mockReturnValue(
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            login: 'login',
            avatar: ['avatar'],
            personal: { name: 'name', surname: 'surname' },
            imgs: {
              avatar: ['avatar'],
              photos: [],
            },
          },
        ]),
    }),
  );
}

describe('Admin', () => {
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => 'adminId');
  });
  afterEach(cleanup);
  it('editMode true when url is .../new', async () => {
    mockFetch();
    render(
      <MemoryRouter initialEntries={['/users/new']}>
        <Admin />
      </MemoryRouter>,
    );
    await act(() => Promise.resolve());
    await waitFor(() =>
      expect(
        screen.getByRole('textbox', { name: /surname \*/i }),
      ).toBeInTheDocument(),
    );
  });

  it('editMode false when url is .../itemId', async () => {
    mockFetch();
    render(
      <MemoryRouter initialEntries={['/users/itemId']}>
        <Admin />
      </MemoryRouter>,
    );
    await act(() => Promise.resolve());
    await waitFor(() =>
      expect(
        screen.queryByRole('textbox', { name: /surname \*/i }),
      ).not.toBeInTheDocument(),
    );
  });
});
