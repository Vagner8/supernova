import { cleanup, render, screen } from '@testing-library/react';
import { Switch } from './Switch';

describe('Switch', () => {
  afterEach(() => {
    cleanup();
  });
  it('Switch is in the document', () => {
    render(<Switch id='id' checked={false} onChange={jest.fn}/>)
    expect(screen.getByText(/offon/i)).toBeInTheDocument();
  });
});
