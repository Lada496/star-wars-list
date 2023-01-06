import React from 'react'
import { rest } from 'msw'
import { Provider } from 'react-redux'
import { render, screen, waitFor } from '@testing-library/react'
import { server } from './testHelpers/server'
import { store } from './store'
import App from './App'
import { starWarsApi } from './api/starWars-api'
import { act } from 'react-dom/test-utils'

describe('App', () => {
  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
    act(() => {
      store.dispatch(starWarsApi.util.resetApiState())
    })
  })

  afterAll(() => {
    server.close()
  })

  test('renders loading component during loading and then switch to body context', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    )

    const loading = screen.getByText(/loading/i)
    expect(loading).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText(/all characters/i)).toBeInTheDocument()
    })

    const notLoading = screen.queryByText(/loading/i)
    expect(notLoading).not.toBeInTheDocument()
  })
  test('renders "No data found" when api returns []', async () => {
    server.use(
      rest.get('https://akabab.github.io/starwars-api/api/all.json', (_, res, ctx) =>
        res(ctx.status(200), ctx.json([])),
      ),
    )
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    )
    await waitFor(() => {
      expect(screen.getByText('No data found')).toBeInTheDocument()
    })
  })
  test('renders "Error" when api returns an error', async () => {
    server.use(
      rest.get('https://akabab.github.io/starwars-api/api/all.json', (_, res) =>
        res.networkError('Failed to connect'),
      ),
    )
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    )
    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument()
    })
  })
})
