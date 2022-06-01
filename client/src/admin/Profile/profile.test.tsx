import { cleanup, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from './Profile';
import { OwnerPII } from './profileApi';
const ProfileComponent = () => (
  <Profile
    adminDispatch={jest.fn}
    eventsDispatch={jest.fn}
    filesDispatch={jest.fn}
    files={null}
    editMode={false}
    errorMessage={''}
    errorField={''}
  />
);

const owner: OwnerPII = {
  personal: {
    name: 'name',
    surname: 'surname',
    avatar: 'url',
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
  it('has Profile class', async () => {
    const { container } = render(ProfileComponent());
    await waitFor(() =>
      expect(container.querySelector('.Profile')).toBeInTheDocument(),
    );
  });
});
