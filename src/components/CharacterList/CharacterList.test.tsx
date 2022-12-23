import { screen, render } from '@testing-library/react'
import CharacterList from './CharacterList'
import { modifiedCharacters } from '../../api/mocks/modifiedCharacters'

describe('CharacterList', () => {
  test('renders a list of characters', () => {
    render(<CharacterList characters={modifiedCharacters} />)
    const characters = screen.getAllByRole('listitem')
    expect(characters).toHaveLength(characters.length)
  })
})
