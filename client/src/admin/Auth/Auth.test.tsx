import '@testing-library/jest-dom';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Auth } from 'admin/Auth/Auth';

const AuthComponent = () => <Auth setOwner={jest.fn} />;
const buttonElement = () => screen.getByRole('button', { name: /send/i });
const nameInput = () => screen.getByRole('textbox', { name: /name/i })
const passwordInput = () => screen.getByLabelText(/password/i);
const nameLabel = () => screen.getByText(/name/i);
const passwordLabel = () => screen.getByText(/password/i);

const typeInputs = async () => {
  for await (const input of [nameInput(), passwordInput()]) {
    await userEvent.type(input, 'text');
  }
};
const submit = async () => {
  await typeInputs();
  await userEvent.click(buttonElement());
};

describe('Auth', () => {
  describe('Error', () => {
    beforeEach(() => {
      window.fetch = jest.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              errorMessage: 'error message',
              errorField: 'name',
            }),
        }),
      ) as jest.Mock;
    });
    afterEach(() => {
      cleanup();
    });
    it('gets field error, one field has error class', async () => {
      render(AuthComponent());
      await submit();
      await waitFor(() => {
        expect(nameInput()).toHaveClass('error')
        expect(passwordInput()).not.toHaveClass('error')
      })
    });
    it('gets field error, one field has error message', async () => {
      render(AuthComponent());
      await submit();
      await waitFor(() => {
        expect(nameLabel()).toHaveTextContent(/error message/i)
        expect(passwordLabel()).not.toHaveTextContent(/error message/i)
      })
    });
  });
});
