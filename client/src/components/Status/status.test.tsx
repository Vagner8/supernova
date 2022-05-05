import { cleanup, render, screen } from '@testing-library/react';
import { Status } from './Status';

describe('Status', () => {
  afterEach(() => {
    cleanup();
  });
  it.skip('if disabled is true, there is disabled text', () => {
    render(<Status disabled={true} />);
    expect(screen.getByText(/disabled/i)).toBeInTheDocument();
  });
  it('if disabled is false, there is active text', () => {
    render(<Status disabled={false} />);
    expect(screen.getByText(/active/i)).toBeInTheDocument();
  });
});
