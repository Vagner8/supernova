import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '../Header/Header';
import { usersInitState } from '../reducers/usersReducer';

const profileState = {
  user: null,
  editMode: false,
};

const dropdownList = usersInitState.dropdownList.map((item) => ({
  ...item,
  disabled: false,
}));

function HeaderComponent() {
  return (
    <Header
      profileState={profileState}
      dropdownList={dropdownList}
      usersDispatch={() => {}}
      profileDispatch={() => {}}
    />
  );
}

describe('Header', () => {
  afterEach(() => {
    cleanup();
  });

  it('is there a dropdown?', () => {
    render(HeaderComponent());
    expect(screen.getByRole('button', { name: /actions/i }));
  });
});
