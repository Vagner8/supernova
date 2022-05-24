import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Container } from './Container';

describe('Container', () => {
  it('has Container class', () => {
    const {container} = render(<Container><div>Element</div></Container>)
    expect(container.querySelector('.Container')).toBeInTheDocument()
  })
})