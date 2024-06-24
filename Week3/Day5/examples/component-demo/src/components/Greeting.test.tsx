import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Greeting from './Greeting'

describe('Display Greeting', () => {
  it('should render a personalised welcome message', () => {
    render(<Greeting name={'Alice'} isBirthday={true} />)

    const foundElement = screen.getByText(/Hello/)
    expect(foundElement).toHaveTextContent('Hello Alice')
  })

  it('should render a generic welcome message when no name is passed', () => {
    render(<Greeting name={''} isBirthday={false} />)

    const foundElement = screen.getByText('Hello')
    expect(foundElement).toBeVisible()
  })

  it('should render a birthday message if it is the user\'s birthday', () => {
    render(<Greeting name={'Alice'} isBirthday={true} />)

    const foundElement = screen.getByText(/Birthday/)
    expect(foundElement).toHaveTextContent('Happy Birthday to you!')
  })

  it('should not render a birthday message if it is not the user\'s birthday', () => {
    render(<Greeting name={'Alice'} isBirthday={false} />)

    expect(screen.queryByText(/Birthday/)).toBeNull()
  })
})
