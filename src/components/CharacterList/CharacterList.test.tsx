import { screen, render } from '@testing-library/react'
import CharacterList from './CharacterList'
import { mockModifiedHumans } from '../../api/mocks/mockModifiedHumans'

describe('CharacterList', () => {
  test('renders a list of characters', () => {
    render(<CharacterList characters={mockModifiedHumans} />)
    const characters = screen.getAllByRole('listitem')
    expect(characters).toHaveLength(characters.length)
  })
})
