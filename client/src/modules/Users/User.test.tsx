import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Users } from './Users';

describe('Users', () => {
  it('clock on edit button', async () => {
    render(<Users />);
  });
});
