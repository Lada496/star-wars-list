import { render, screen } from '@testing-library/react'
import CharacterItem from '../CharacterItem'
import { modifiedCharacters } from './mocks/modifiedCharacters'

describe('CharacterItem', () => {
  test('renders a character item', () => {
    render(<CharacterItem character={modifiedCharacters[1]} />)
    const character = screen.getByText(modifiedCharacters[1].name)
    expect(character).toBeInTheDocument()
  })
})
