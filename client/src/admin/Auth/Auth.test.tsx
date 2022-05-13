// import '@testing-library/jest-dom';
// import { cleanup, render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { fetchData } from '../../api/api';
// import { Auth } from './Auth';

// jest.mock('../../api/api');
// const mockFetchData = fetchData as jest.MockedFunction<typeof fetchData>;

// const renderAuthComponent = () => {
//   return <Auth setOwner={jest.fn} />
// }

// const getName = () => screen.getByRole('textbox', { name: /name/i });
// const getPassword = () => screen.getByLabelText(/password/i);
// const getButton = () => screen.getByRole('button', { name: /send/i });

export function Auth() {
  return null
}

// const getAllInputs = () => {
//   return [getName(), getPassword()];
// };

// const allInputsHaveValue = async () => {
//   for await (const input of getAllInputs()) {
//     await userEvent.type(input, 'text');
//   }
// };

// const onSubmit = async () => {
//   await allInputsHaveValue();
//   await userEvent.click(getButton());
// };

// describe('Auth', () => {
//   beforeEach(() => {
//     mockFetchData.mockReturnValue(
//       Promise.resolve({
//         error: false,
//         message: 'success',
//         field: 'email',
//       }),
//     );
//   });
//   afterEach(() => {
//     cleanup();
//   });
//   it('inputs Name, Email, Password and Button are exist', async () => {
//     render(renderAuthComponent());
//     getAllInputs().forEach((input) => expect(input).toBeInTheDocument());
//     expect(getButton()).toBeInTheDocument();
//     expect(getButton()).toBeDisabled();
//   });
//   it('onChange events works', async () => {
//     render(renderAuthComponent());
//     await allInputsHaveValue();
//     for await (const input of getAllInputs()) {
//       await waitFor(() => expect(input).toHaveValue('text'));
//     }
//   });
//   it('if all inputs have values you can click the button', async () => {
//     render(renderAuthComponent());
//     await allInputsHaveValue();
//     await waitFor(() => expect(getButton()).not.toBeDisabled());
//   });
//   it('if we get an error a notice shows up', async () => {
//     mockFetchData.mockReturnValue(
//       Promise.resolve({
//         error: true,
//         message: 'error message',
//         field: 'email',
//       }),
//     );
//     render(renderAuthComponent());
//     await onSubmit();
//     await waitFor(() =>
//       expect(screen.getByText('error message')).toBeInTheDocument(),
//     );
//   });
//   it('when submit progressbar appears, button disabled', async () => {
//     render(renderAuthComponent());
//     await onSubmit();
//     await waitFor(() =>
//       expect(screen.getByRole('progressbar')).toBeInTheDocument(),
//     );
//     await waitFor(() => expect(getButton()).toBeDisabled());
//     await waitFor(
//       () => expect(screen.queryByRole('progressbar')).not.toBeInTheDocument(),
//       { timeout: 500 },
//     );
//     await waitFor(() => expect(getButton()).not.toBeDisabled());
//   });
// });
