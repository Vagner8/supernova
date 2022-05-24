import { cleanup, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Circular } from './Circular';

describe('Circular', () => {
  afterEach(() => {
    cleanup();
  });
  it('', () => {
    const { container } = render(<Circular color='black' />);
    expect(container.querySelector('.Circular')).toBeInTheDocument();
  });
});
