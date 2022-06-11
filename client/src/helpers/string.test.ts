import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { capitalizer } from './stringHelpers';

describe('capitalizer', () => {
  afterEach(cleanup)
  it('capitalizes certain letters', () => {
    expect(capitalizer({str: 'string', index: 1})).toEqual('sTring')
    expect(capitalizer({str: 'string', index: 0})).toEqual('String')
    expect(capitalizer({str: 'string', index: 5})).toEqual('strinG')
  })
})