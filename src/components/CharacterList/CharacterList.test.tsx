import { screen, render } from '@testing-library/react'
import CharacterList from './CharacterList'
import { mockModifiedCharacters } from '../../api/mocks/mockModifiedCharacters'

describe('CharacterList', () => {
  test('renders a list of characters', () => {
    render(<CharacterList characters={mockModifiedCharacters} />)
    const characters = screen.getAllByRole('listitem')
    expect(characters).toHaveLength(characters.length)
  })
})
