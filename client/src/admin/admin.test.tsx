import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { Admin } from './Admin';

describe('Admin', () => {
  it('editMode true when itemId is new', async () => {
    render(
      <MemoryRouter initialEntries={['/admin/users/new']}>
        <Admin />
      </MemoryRouter>,
    );
    await act(() => Promise.resolve());
    await waitFor(() => screen.debug());
  });
});
