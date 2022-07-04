import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { Chip } from './Chip';

describe('Chip', () => {
  afterEach(cleanup)
  window.URL.createObjectURL = jest.fn()
  it('has text', () => {
    render(<Chip text='text'/>)
    expect(screen.getByText(/text/i)).toBeInTheDocument()
  })
  it('has or no has cross button', () => {
    render(<Chip text='text'/>)
    expect(screen.queryByText(/cancel/i)).not.toBeInTheDocument()
    render(<Chip text='text' onClick={jest.fn}/>)
    expect(screen.getByText(/cancel/i)).toBeInTheDocument()
  })
  it('has or no has image', () => {
    render(<Chip text='text'/>)
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    render(<Chip text='text' url='url'/>)
    expect(screen.getByRole('img')).toBeInTheDocument()
    render(<Chip text='text' file={new File([new Blob()], 'name')}/>)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
})