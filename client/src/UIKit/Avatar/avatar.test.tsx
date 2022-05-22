import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

const avatar = (url?: string) => <Avatar url={url} />
const imgElement = () => screen.getByRole('img')
const iconElement = () => screen.getByText(/account_circle/i)

describe('Avatar', () => {
  afterEach(() => {
    cleanup()
  })
  it('has classes img_wrapper, Avatar', () => {
    render(avatar('url'))
    expect(imgElement().parentElement).toHaveClass('img_wrapper')
    expect(imgElement().parentElement?.parentElement).toHaveClass('Avatar')
  })
  it('has img', () => {
    render(avatar('url'))
    expect(imgElement()).toBeInTheDocument()
  })
  it('gets icon if no url', () => {
    render(avatar())
    expect(iconElement()).toBeInTheDocument()
  })
})