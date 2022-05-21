import '@testing-library/jest-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { Button } from './Button';
import userEvent from '@testing-library/user-event';

const ButtonComponent = (disabled: boolean) => (
  <Button title="send" type="button" disabled={disabled} />
);
const buttonElement = () => screen.getByRole('button', { name: /send/i });

describe('Button', () => {
  afterEach(() => {
    cleanup();
  });
  it('disabled prop is true, has disabled class', () => {
    render(ButtonComponent(true));
    expect(buttonElement()).toHaveClass('disabled');
  });
  it('disabled prop is false, no disabled class', () => {
    render(ButtonComponent(false));
    expect(buttonElement()).not.toHaveClass('disabled');
  });
  it('clicks ripple element appears', async () => {
    render(ButtonComponent(false));
    expect(buttonElement().children.length).toEqual(1);
    await userEvent.click(buttonElement());
    expect(buttonElement().children.length).toEqual(2);
    expect(buttonElement().children[1]).toHaveClass('ripple');
    await waitFor(() => expect(buttonElement().children.length).toEqual(1));
  });
});
