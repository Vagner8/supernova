import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from './Profile';
import { ProfileType } from './profileReducer';

const ProfileComponent = () => (
  <Profile
    adminDispatch={jest.fn}
    eventsDispatch={jest.fn}
    filesDispatch={jest.fn}
    files={null}
    editMode={false}
  />
);

const owner: ProfileType = {
  personal: {
    name: 'name',
    surname: 'surname',
    avatar: 'avatar',
  },
  contacts: {
    email: 'email',
    phone: 'phone',
  },
  address: {
    city: 'city',
    zip: 'zip',
    street: 'street',
    number: 'number',
  },
};

describe('Profile', () => {
  afterEach(() => {
    cleanup();
  });
  it('has Snackbar class', async () => {
    const { container } = render(ProfileComponent());
    expect(container.querySelector('.Profile')).toBeInTheDocument();
  });
});
