import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usersInitState } from '../../modules/Users/reducers/usersReducer';
import { Users } from '../../modules/Users/Users';
import { Dropdown } from './Dropdown';

const dropdownList = usersInitState.dropdownList.map((item) => ({
  ...item,
  disabled: false,
}));

describe('Dropdown', () => {
  describe('static tests', () => {
    it('component renders without props', () => {
      render(<Dropdown />);
      expect(screen.getByRole('button', { name: /actions/i }));
    });
  });

  describe('dynamic tests', () => {
    it('component renders without props', async () => {
      render(<Users />);
      userEvent.click(screen.getByRole('link', { name: /edit on/i }));
      expect(await screen.findByRole('link', { name: /edit off/i }));
      userEvent.click(screen.getByRole('link', { name: /edit on/i }));
    });
  });

  afterEach(() => {
    cleanup();
  });
});
