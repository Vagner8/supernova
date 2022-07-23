import '@testing-library/jest-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from 'App';

const mockFetch = () => {
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
            email: 'myevropa1@gmail.com',
            isNotAdmin: true,
            itemId: 'c3d63c5c-0063-4835-a109-10b86637c191',
            name: 'Vova',
            phone: '+420776544634',
            rule: 'Developer',
            surname: 'Yarovy',
            _id: '62d96d1f47c7afad8d0ed6f8',
          },
        ]),
    }),
  );
};

const renderApp = async (
  initialEntries: ['/admin/users', '/new' | '/adminId' | '/itemId'],
) => {
  const { container } = render(
    <MemoryRouter initialEntries={[initialEntries.join('')]}>
      <App />
    </MemoryRouter>,
  );
  await act(() => Promise.resolve());
  return {
    container,
  };
};

describe('profile.test', () => {
  beforeEach(() => {
    Storage.prototype.getItem = jest.fn(() => 'adminId');
    mockFetch();
  });
  afterEach(cleanup);
  describe('editMode', () => {
    it('editMode true when url is .../new', async () => {
      await renderApp(['/admin/users', '/new']);
      await waitFor(() =>
        expect(
          screen.getByRole('textbox', { name: /surname \*/i }),
        ).toBeInTheDocument(),
      );
    });

    it('editMode false when url is .../itemId', async () => {
      await renderApp(['/admin/users', '/itemId']);
      await waitFor(() =>
        expect(
          screen.queryByRole('textbox', { name: /surname \*/i }),
        ).not.toBeInTheDocument(),
      );
    });
  });

  describe('delete event', () => {
    it('no delete event if itemId === new', async () => {
      await renderApp(['/admin/users', '/new']);
      await userEvent.click(screen.getByRole('button', { name: /events/i }));
      await waitFor(() => {
        expect(
          screen.queryByRole('button', { name: /delete/i }),
        ).not.toBeInTheDocument();
      });
    });

    it('after delete click navigate to table page', async () => {
      const { container } = await renderApp(['/admin/users', '/itemId']);
      await userEvent.click(screen.getByRole('button', { name: /events/i }));
      await userEvent.click(screen.getByRole('button', { name: /delete/i }));
      await waitFor(() =>
        expect(container.querySelector('.Table')).toBeInTheDocument(),
      );
    });

    it('no delete event if itemId === adminId', async () => {
      await renderApp(['/admin/users', '/adminId'])
      await userEvent.click(screen.getByRole('button', { name: /events/i }));
      await waitFor(() => {
        expect(
          screen.queryByRole('button', { name: /delete/i }),
        ).not.toBeInTheDocument();
      });
    });

    it('is delete event if itemId !== adminId', async () => {
      await renderApp(['/admin/users', '/itemId'])
      await userEvent.click(screen.getByRole('button', { name: /events/i }));
      await waitFor(() => {
        expect(
          screen.getByRole('button', { name: /delete/i }),
        ).toBeInTheDocument();
      });
    });
  });

  describe('edit and edit off events', () => {
    it('click on edit, edit off appears', async () => {
      await renderApp(['/admin/users', '/itemId'])
      await waitFor(() =>
        expect(
          screen.queryByRole('textbox', { name: /surname \*/i }),
        ).not.toBeInTheDocument(),
      );
      await userEvent.click(screen.getByRole('button', { name: /events/i }));
      await userEvent.click(screen.getByRole('button', { name: /edit/i }));
      await waitFor(() =>
        expect(
          screen.getByRole('textbox', { name: /surname \*/i }),
        ).toBeInTheDocument(),
      );
    });

    it('toggle edit and edit off', async () => {
      await renderApp(['/admin/users', '/itemId'])
      await userEvent.click(screen.getByRole('button', { name: /events/i }));
      await userEvent.click(screen.getByRole('button', { name: /edit/i }));
      await userEvent.click(screen.getByRole('button', { name: /events/i }));
      await waitFor(() =>
        expect(
          screen.getByRole('button', { name: /edit off/i }),
        ).toBeInTheDocument(),
      );
      await userEvent.click(screen.getByRole('button', { name: /events/i }));
      await userEvent.click(screen.getByRole('button', { name: /edit off/i }));
      await userEvent.click(screen.getByRole('button', { name: /events/i }));
      await waitFor(() =>
        expect(
          screen.getByRole('button', { name: /edit/i }),
        ).toBeInTheDocument(),
      );
    });
  });

  describe('save event', () => {
    it('toggle save', async () => {
      await renderApp(['/admin/users', '/itemId'])
      await userEvent.click(screen.getByRole('button', { name: /events/i }));
      await userEvent.click(screen.getByRole('button', { name: /edit/i }));
      await userEvent.click(screen.getByRole('button', { name: /events/i }));
      await waitFor(() =>
        expect(
          screen.getByRole('button', { name: /save/i }),
        ).toBeInTheDocument(),
      );
      await userEvent.click(screen.getByRole('button', { name: /events/i }));
      await userEvent.click(screen.getByRole('button', { name: /edit off/i }));
      await userEvent.click(screen.getByRole('button', { name: /events/i }));
      await waitFor(() =>
        expect(
          screen.queryByRole('button', { name: /save/i }),
        ).not.toBeInTheDocument(),
      );
    });
  });
});
