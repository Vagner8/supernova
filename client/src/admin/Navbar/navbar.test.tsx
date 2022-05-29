import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from './Navbar';

const NavbarComponent = (avatar: string, ownerName: string) => (
  <MemoryRouter initialEntries={['/admin']}>
    <Navbar
      saveButton={true}
      dependentState='adminState'
      editMode={false}
      // avatar={avatar}
      // ownerName={ownerName}
      events={['1']}
      eventsDispatch={jest.fn}
      adminDispatch={jest.fn}
      filesDispatch={jest.fn}
    />
  </MemoryRouter>
);
const navbarElement = () => screen.getByRole('navigation');
const menuButtonElement = () => screen.getByRole('button', { name: /menu/i });

describe('Navbar', () => {
  afterEach(() => {
    cleanup();
  });
  it('is exist', () => {
    render(NavbarComponent('url', 'name'));
    expect(navbarElement()).toBeInTheDocument();
  });
  it('has class Navbar', () => {
    render(NavbarComponent('url', 'name'));
    expect(navbarElement()).toHaveClass('Navbar');
  });
  it('has menu icon', () => {
    render(NavbarComponent('url', 'name'));
    expect(menuButtonElement()).toBeInTheDocument();
  });
  it('gets url, img appears', () => {
    render(NavbarComponent('url', 'name'));
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
  it('gets name, name appears', () => {
    render(NavbarComponent('url', 'name'));
    expect(screen.getByText('name')).toBeInTheDocument();
  });
});
