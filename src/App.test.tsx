import React from 'react'
import { rest } from 'msw'
import { waitFor } from '@testing-library/react'
import { renderWithWrappers } from './testHelpers/renderWithWrappers'
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
    const { getByText, queryByText } = renderWithWrappers(<App />, store)

    const loading = getByText(/loading/i)
    expect(loading).toBeInTheDocument()

    await waitFor(() => {
      expect(getByText(/all characters/i)).toBeInTheDocument()
    })

    const notLoading = queryByText(/loading/i)
    expect(notLoading).not.toBeInTheDocument()
  })
  test('renders "No data found" when api returns []', async () => {
    server.use(
      rest.get('https://akabab.github.io/starwars-api/api/all.json', (_, res, ctx) =>
        res(ctx.status(200), ctx.json([])),
      ),
    )

    const { getByText } = renderWithWrappers(<App />, store)

    await waitFor(() => {
      expect(getByText('No data found')).toBeInTheDocument()
    })
  })
  test('renders an error message when api returns an error', async () => {
    server.use(
      rest.get('https://akabab.github.io/starwars-api/api/all.json', (_, res) =>
        res.networkError('Failed to connect'),
      ),
    )
    const { getByText } = renderWithWrappers(<App />, store)
    await waitFor(() => {
      expect(getByText(/error/i)).toBeInTheDocument()
    })
  })
})

describe('App | Router', () => {
  test('User can choose what species page to visit', async () => {
    const { user, getByRole } = renderWithWrappers(<App />, store)

    await waitFor(() => {
      expect(getByRole('link', { name: /human/i })).toBeInTheDocument()
    })
    const navLinkToHuman = getByRole('link', { name: /human/i })
    user.click(navLinkToHuman)

    expect(getByRole('heading', { level: 1, name: /human/i })).toBeInTheDocument()
  })
  test('Redirect to All characters page when user visit any bad path', async () => {
    const { getByRole } = renderWithWrappers(<App />, store, {
      route: '/pathname-that-does-not-match-any-species-name',
    })

    await waitFor(() => {
      expect(getByRole('heading', { level: 1, name: /all characters/i }))
    })
  })
})
