import React from 'react';
import userEvent from '@testing-library/user-event';
import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { mockFetch } from '../mockFunctions';
import { Admin } from '../../Admin';
import { mockUsers } from '../mockData';

const admin = (
  <MemoryRouter initialEntries={['/admin/users']}>
    <Admin />
  </MemoryRouter>
);

// describe('Users errors test', () => {
//   beforeEach(() => {
//     mockFetch(mockUsers);
//   });
//   afterEach(() => {
//     cleanup();
//   });
//   it('get empty array of users from server', async () => {
//     render(admin);
//     await act(() => Promise.resolve());
//     await waitFor(() => expect(screen.getByText('Sylvester')));
//   });
// });
