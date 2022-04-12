import '@testing-library/jest-dom'
import { cleanup, render, screen } from '@testing-library/react'
import { Users } from './Users'
import userEvent from '@testing-library/user-event'

describe('Users', ()=> {
    it('clock on edit button', async () => {
        render(<Users/>)
      })
})