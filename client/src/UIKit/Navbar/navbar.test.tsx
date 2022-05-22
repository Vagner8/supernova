import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from './Navbar';

const navbar = () => (
  <MemoryRouter initialEntries={['/admin']}>
    <Navbar />
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
    render(navbar());
    expect(navbarElement()).toBeInTheDocument();
  });
  it('has link', () => {
    render(navbar());
    expect(linkElement()).toBeInTheDocument();
  });
  it('has class Navbar', () => {
    render(navbar());
    expect(navbarElement()).toHaveClass('Navbar');
  });
  it('has menu icon', () => {
    render(navbar());
    expect(menuButtonElement()).toBeInTheDocument();
  });
});
