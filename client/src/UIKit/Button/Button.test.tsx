import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { Button } from './Button';

const ButtonComponent = (disabled: boolean) => (
  <Button title="send" type="button" disabled={disabled} />
);
const buttonElement = () => screen.getByRole('button', { name: /send/i });

describe('Button', () => {
  afterEach(() => {
    cleanup();
  });
  it('gets disabled true, has disabled class', () => {
    render(ButtonComponent(true));
    expect(buttonElement()).toHaveClass('disabled');
  });
  it('gets disabled false, no disabled class', () => {
    render(ButtonComponent(false));
    expect(buttonElement()).not.toHaveClass('disabled');
  });
});
