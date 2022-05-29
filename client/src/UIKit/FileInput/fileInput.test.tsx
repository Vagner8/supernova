import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FileInput } from './FileInput';

const ChipsComponent = ({ multiple }: { multiple: boolean }) => (
  <FileInput onChange={jest.fn} multiple={multiple} />
);

describe('FileInput', () => {
  afterEach(() => {
    cleanup();
  });
  it('has class FileInput', () => {
    const { container } = render(ChipsComponent({ multiple: true }));
    expect(container.querySelector('.FileInput')).toBeInTheDocument();
  });
  it('has input', () => {
    const { container } = render(ChipsComponent({ multiple: true }));
    expect(container.querySelector('input[type="file"]')).toBeInTheDocument();
  });
  it('gets multiple true, has pick files', () => {
    render(ChipsComponent({ multiple: true }));
    expect(screen.getByText('pick files')).toBeInTheDocument();
  });
  it('gets multiple false, has pick file', () => {
    render(ChipsComponent({ multiple: false }));
    expect(screen.getByText('pick file')).toBeInTheDocument();
  });
});
