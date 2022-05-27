import { cleanup, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FileInput } from './FileInput';
import userEvent from '@testing-library/user-event';
import { uploadFiles } from 'firebaseSender';

jest.mock('firebaseSender');

const mockFirebaseSender = uploadFiles as jest.MockedFunction<
  typeof uploadFiles
>;

const fileInput = () => <FileInput title='title' multiple={true} />;

const buttonElement = (title: 'file' | 'send' = 'file') =>
  screen.getByRole('button', { name: RegExp(title, 'i') });
const inputFileElement = () => buttonElement().querySelector('input');
const files = () => [
  new File(['file1'], 'file1.png', { type: 'image/png' }),
  new File(['file2'], 'file2.png', { type: 'image/png' }),
  new File(['file3'], 'file3.png', { type: 'image/png' }),
];
const fileNames = () => [
  screen.getByText(/file1\.png/i),
  screen.getByText(/file2\.png/i),
  screen.getByText(/file3\.png/i),
];
const onChange = async () => {
  const input = inputFileElement();
  if (input) await userEvent.upload(input, files());
  return input;
};
const closeElement = () => screen.getAllByText(/cancel/i);
const eraser = () => screen.getByText(/delete/i);

describe('FileInput', () => {
  afterEach(() => {
    cleanup();
  });
  it('has input class', () => {
    render(fileInput());
    expect(inputFileElement()).toBeInTheDocument();
  });
  it('loads files', async () => {
    render(fileInput());
    await onChange();
    expect(fileNames()[0]).toBeInTheDocument();
    expect(fileNames()[1]).toBeInTheDocument();
    expect(fileNames()[2]).toBeInTheDocument();
  });
  it('has send button after onChange', async () => {
    render(fileInput());
    await onChange();
    expect(buttonElement('send')).toBeInTheDocument();
  });
  it('deletes file', async () => {
    render(fileInput());
    await onChange();
    await userEvent.click(closeElement()[0]);
    expect(screen.queryByText(/file1\.png/i)).not.toBeInTheDocument();
    await userEvent.click(closeElement()[1]);
    expect(screen.queryByText(/file3\.png/i)).not.toBeInTheDocument();
  });
  it('can delete all files', async () => {
    render(fileInput());
    await onChange();
    await userEvent.click(eraser());
    expect(screen.queryByText(/file1\.png/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/file2\.png/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/file3\.png/i)).not.toBeInTheDocument();
  });
  it('no files no Eraser component', () => {
    render(fileInput());
    expect(screen.queryByText(/delete/i)).not.toBeInTheDocument();
  });
  it('gets 3 files has Eraser component', async () => {
    render(fileInput());
    await onChange();
    expect(eraser()).toBeInTheDocument();
  });
  it('has Circular component while sending', async () => {
    const { container } = render(fileInput());
    await onChange();
    await userEvent.click(buttonElement('send'));
    await waitFor(
      () => mockFirebaseSender.mockReturnValue(Promise.resolve(['imgUrl'])),
      {
        timeout: 1000,
      },
    );
    expect(container.querySelector('.Circular')).toBeInTheDocument();
  });
});
