import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { Linear } from './Linear';

describe('Linear', () => {
  const progressElement = () => screen.getByRole('progressbar')
  afterEach(() => {
    cleanup()
  })
  it('has class Linear', () => {
    render(<Linear show={true} />)
    expect(progressElement()).toHaveClass('Linear')
  })
  it('appears if show prop is true', () => {
    render(<Linear show={true} />)
    expect(progressElement()).toBeInTheDocument()
  })
  it('disappears if show prop is false', () => {
    render(<Linear show={false} />)
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
  })
})