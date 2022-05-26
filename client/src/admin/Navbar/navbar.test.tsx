import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from './Navbar';

const NavbarComponent = (avatar: string, ownerName: string ) => (
  <MemoryRouter initialEntries={['/admin']}>
    <Navbar avatar={avatar} ownerName={ownerName}/>
  </MemoryRouter>
);
const navbarElement = () => screen.getByRole('navigation');
const linkElement = () => screen.getByRole('link', { name: /logo/i });
const menuButtonElement = () => screen.getByRole('button', { name: /menu/i })

describe('Navbar', () => {
  afterEach(() => {
    cleanup();
  });
  it('is exist', () => {
    render(NavbarComponent('url', 'name'));
    expect(navbarElement()).toBeInTheDocument();
  });
  it('has link', () => {
    render(NavbarComponent('url', 'name'));
    expect(linkElement()).toBeInTheDocument();
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
  })
  it('gets name, name appears', () => {
    render(NavbarComponent('url', 'name'));
    expect(screen.getByText('name')).toBeInTheDocument();
  })
});
