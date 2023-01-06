import { rest } from 'msw'
import { RowCharacter } from '../api/starWars-types'
import { mockChatacters } from '../api/mocks/mockChatacters'

export const handlers = [
  rest.get('https://akabab.github.io/starwars-api/api/all.json', (_, res, ctx) =>
    res(ctx.status(200), ctx.json<RowCharacter[]>(mockChatacters)),
  ),
]
