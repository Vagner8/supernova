import { cleanup, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from './Profile';
import { Owner } from 'admin/adminReducer';

const ProfileComponent = (owner: Owner | null) => <Profile owner={owner} />;

const owner: Owner = {
  personal: {
    name: 'name',
    surname: 'surname',
    avatar: 'avatar'
  },
  contacts: {
    email: 'email',
    phone: 'phone',
  },
  address: {
    city: 'city',
    zip: 'zip',
    street: 'street',
    number: 'number'
  }
}

describe('Profile', () => {
  afterEach(() => {
    cleanup();
  });
  it('has Snackbar class', async () => {
    const { container } = render(ProfileComponent(owner));
    expect(container.querySelector('.Profile')).toBeInTheDocument()
  });
});
