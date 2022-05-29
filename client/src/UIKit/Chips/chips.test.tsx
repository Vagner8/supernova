import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Chips } from './Chips';

const ChipsComponent = (text: string, url?: string) => (
  <Chips url={url} text={text} onClick={jest.fn} />
);

describe('Chips', () => {
  afterEach(() => {
    cleanup();
  });
  it('has class Chips', () => {
    const { container } = render(ChipsComponent('text'));
    expect(container.querySelector('.Chips')).toBeInTheDocument();
  });
  it('has text', () => {
    render(ChipsComponent('text'));
    expect(screen.getByText('text')).toBeInTheDocument();
  });
  it('has icon', () => {
    render(ChipsComponent('text'));
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
  });
  it('gets url, has img', () => {
    render(ChipsComponent('text', 'url'));
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
  it('gets url, has class with_img', () => {
    const {container} = render(ChipsComponent('text', 'url'));
    expect(container.querySelector('.with_img')).toBeInTheDocument();
  });
});
