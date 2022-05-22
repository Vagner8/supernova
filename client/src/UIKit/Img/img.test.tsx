import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { Img } from './Img';

const img = () => <Img url='url' alt='alt' />
const imgElement = () => screen.getByRole('img')

describe('Img', () => {
  afterEach(() => {
    cleanup()
  })
  it('has Img class', async () => {
    render(img())
    expect(imgElement()).toBeInTheDocument()
    expect(imgElement()).toHaveClass('Img')
  })
})