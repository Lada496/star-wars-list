import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { rest } from 'msw'
import { Provider } from 'react-redux'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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
      { wrapper: BrowserRouter },
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
      { wrapper: BrowserRouter },
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
      { wrapper: BrowserRouter },
    )
    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument()
    })
  })
})

describe('App | Router', () => {
  const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test Page', route)
    return {
      user: userEvent,
      ...render(ui, { wrapper: BrowserRouter }),
    }
  }
  test('User can choose what species page to visit', async () => {
    const { user } = renderWithRouter(
      <Provider store={store}>
        <App />
      </Provider>,
    )

    await waitFor(() => {
      expect(screen.getByRole('link', { name: /human/i })).toBeInTheDocument()
    })
    const navLinkToHuman = screen.getByRole('link', { name: /human/i })
    await user.click(navLinkToHuman)

    expect(screen.getByRole('heading', { level: 1, name: /human/i })).toBeInTheDocument()
  })
  test('Redirect to All characters page when user visit any bad path', () => {
    renderWithRouter(
      <Provider store={store}>
        <App />
      </Provider>,
      { route: '/pathname-that-does-not-match-any-species-name' },
    )

    expect(screen.getByRole('heading', { level: 1, name: /all characters/i }))
  })
})
