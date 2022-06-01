import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { Avatar, ProfileProps } from './Avatar';

const avatar = ({ url, size }: ProfileProps) => (
  <Avatar url={url} size={size} />
);

describe('Avatar', () => {
  afterEach(() => {
    cleanup();
  });
  it('has classes Avatar', () => {
    const { container } = render(avatar({ url: 'url', size: 'xs' }));
    expect(container.querySelector('.Avatar')).toBeInTheDocument();
    expect(container.querySelector('.xs')).toBeInTheDocument();
  });
  it('has img', () => {
    const { container } = render(avatar({ url: 'url', size: 'm' }));
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(container.querySelector('.m')).toBeInTheDocument();
  });
  it('gets icon if no url', () => {
    const { container } = render(avatar({ url: null, size: 'l' }));
    expect(screen.getByText(/account_circle/i)).toBeInTheDocument();
    expect(container.querySelector('.l')).toBeInTheDocument();
  });
});
