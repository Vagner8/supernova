import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { Header } from './Header';
import { mockData } from '../../admin/Users/test/mockData';

describe('Header', () => {
  afterEach(() => {
    cleanup();
  });
  it('there is dropList in the screen', () => {
    render(<Header state={mockData} dispatch={jest.fn()} />);
    expect(
      screen.getByRole('button', { name: /actions/i }),
    ).toBeInTheDocument();
  });
});
