import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Store } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export const renderWithWrappers = (ui: React.ReactElement, store: Store, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test Page', route)
  return {
    user: userEvent,
    ...render(<Provider store={store}>{ui}</Provider>, { wrapper: BrowserRouter }),
  }
}
