import React from 'react'
import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import { store } from './store'
import App from './App'

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
  )
  const linkElement = screen.getByText(/click/i)
  expect(linkElement).toBeInTheDocument()
})
