import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from 'UIKit'

const InputComponent = (
  value: '' | 'text' = '',
  message: 'error message' | null = null,
  field: 'name' | 'password' | null = null,
) => (
  <Input
    value={value}
    label="label"
    errorMessage={message}
    errorField={field}
    onChange={jest.fn}
  />
);

const inputElement = () => screen.getByRole('textbox', { name: /label/i })
const divElement = () => screen.getByRole('group');
const labelElement = () => screen.getByText(/label/i)

describe('Input', () => {
  afterEach(() => {
    cleanup();
  });
  it('input has state value', async () => {
    render(InputComponent('text'));
    expect(inputElement()).toHaveValue('text');
  });
  it('start typing, the div has active class', async () => {
    render(InputComponent('text'));
    await userEvent.type(inputElement(), 'text');
    expect(divElement()).toHaveClass('active');
  });
  it('input has no value and focus, div has no active class', async () => {
    render(InputComponent());
    expect(divElement()).not.toHaveClass('active');
  });
  it('gets error, label has error message', async () => {
    render(InputComponent('text', 'error message'));
    expect(labelElement()).toHaveTextContent(/error message/i);
  });
  it('gets error, label and input have error class', () => {
    render(InputComponent('text', 'error message'));
    expect(inputElement()).toHaveClass('error');
    expect(labelElement()).toHaveClass('error');
  });
  it('no error message, no error class', async () => {
    render(InputComponent('text'));
    expect(inputElement()).not.toHaveClass('error');
    expect(labelElement()).not.toHaveClass('error');
  });
});
