import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Calculator from '@/components/Calculator'

// Mock RPC客户端
jest.mock('@/lib/client', () => ({
  client: {
    calculate: jest.fn()
  }
}))

describe('Calculator Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should perform addition', async () => {
    const mockCalculate = require('@/lib/client').client.calculate
    mockCalculate.mockResolvedValueOnce({ result: 5 })
    
    const user = userEvent.setup()
    render(<Calculator />)

    await user.type(screen.getByPlaceholderText('Enter number A'), '2')
    await user.type(screen.getByPlaceholderText('Enter number B'), '3')
    await user.click(screen.getByRole('button', { name: /Calculate/i }))

    await waitFor(() => {
      expect(mockCalculate).toHaveBeenCalledWith({
        a: 2,
        b: 3,
        operator: 0 // OPERATOR_ADD
      })
      expect(screen.getByText('Result: 5')).toBeInTheDocument()
    })
  })

  test('should display error message', async () => {
    const mockCalculate = require('@/lib/client').client.calculate
    const error = new Error('Division by zero')
    mockCalculate.mockRejectedValueOnce(error)
    
    const user = userEvent.setup()
    render(<Calculator />)

    await user.type(screen.getByPlaceholderText('Enter number A'), '5')
    await user.type(screen.getByPlaceholderText('Enter number B'), '0')
    await user.selectOptions(screen.getByRole('combobox'), '3') // DIVIDE
    await user.click(screen.getByRole('button', { name: /Calculate/i }))

    await waitFor(() => {
      expect(screen.getByText(/Error: Division by zero/)).toBeInTheDocument()
    })
  })
})