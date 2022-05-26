import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Err } from 'api/fetcher';
import { Input } from 'UIKit';

const passwordError: Err = {
  status: 400,
  message: 'error message',
  field: 'password',
  logout: false,
};

const nameError: Err = {
  status: 400,
  message: 'error message',
  field: 'name',
  logout: false,
};

const errorWithoutField: Err = {
  status: 400,
  message: 'error message',
  field: null,
  logout: false,
};

const InputComponent = (
  label: 'password' | 'name',
  type: 'text' | 'password',
  value: string,
  error: Err | null,
) => (
  <Input
    value={value}
    label={label}
    error={error}
    type={type}
    onChange={jest.fn}
  />
);

const PasswordInputComponent = (error: Err | null) =>
  InputComponent('password', 'password', '123', error);
const NameInputComponent = (error: Err | null) =>
  InputComponent('name', 'text', 'John', error);

const inputElement = (name: 'password' | 'name') =>
  screen.getByLabelText(RegExp(name, 'i'));

describe('Input', () => {
  afterEach(() => {
    cleanup();
  });
  it('gets password error, only password input has error', () => {
    const { container } = render(
      <div>
        {PasswordInputComponent(passwordError)}
        {NameInputComponent(passwordError)}
      </div>,
    );
    screen.debug();
    expect(inputElement('password')).toHaveClass('error');
    expect(container.querySelector('label[for=password]')).toHaveTextContent(
      'password - error message',
    );
    expect(inputElement('name')).not.toHaveClass('error');
    expect(container.querySelector('label[for=name]')).toHaveTextContent(
      'name',
    );
  });
  it('gets name error, only name input has error', () => {
    const {container} = render(
      <div>
        {PasswordInputComponent(nameError)}
        {NameInputComponent(nameError)}
      </div>,
    );
    expect(inputElement('password')).not.toHaveClass('error');
    expect(container.querySelector('label[for=password]')).toHaveTextContent(
      'password',
    );
    expect(inputElement('name')).toHaveClass('error');
    expect(container.querySelector('label[for=name]')).toHaveTextContent(
      'name - error message',
    );
  });
  it('gets error without field, all input have error', () => {
    const {container} = render(
      <div>
        {PasswordInputComponent(errorWithoutField)}
        {NameInputComponent(errorWithoutField)}
      </div>,
    );
    expect(inputElement('password')).toHaveClass('error');
    expect(container.querySelector('label[for=password]')).toHaveTextContent(
      'password - error message',
    );
    expect(inputElement('name')).toHaveClass('error');
    expect(container.querySelector('label[for=name]')).toHaveTextContent(
      'name - error message',
    );
  })
  it('can show password', async () => {
    render(PasswordInputComponent(null))
    await userEvent.click(screen.getByText(/visibility_off/i))
    expect((inputElement('password') as HTMLInputElement).type).toEqual('text')
  })
});
