import AllSpecies from './AllSpecies'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockModifiedCharacters } from '../../api/mocks/mockModifiedCharacters'

const charactersForSort = [
  {
    id: 1,
    name: 'a',
    image: 'a.com',
    gender: 'a',
    species: 'a',
    height: 50,
    mass: 10,
  },
  {
    id: 2,
    name: 'b',
    image: 'b.com',
    gender: 'b',
    species: 'b',
    height: 100,
    mass: 50,
  },
  {
    id: 3,
    name: 'c',
    image: 'c.com',
    gender: 'c',
    species: 'c',
    height: 10,
    mass: 100,
  },
]

describe('AllSpecies', () => {
  test('render multiple kinds of spiceis characters in one list', () => {
    render(<AllSpecies characters={mockModifiedCharacters} />)
    const humans = screen.getAllByText(/human/i)
    expect(humans.length).toBeGreaterThan(0)
    const droids = screen.getAllByText(/droid/i)
    expect(droids.length).toBeGreaterThan(0)
  })
  test('render characters descendingly sorted by their height ', async () => {
    render(<AllSpecies characters={charactersForSort} />)
    await userEvent.selectOptions(screen.getByRole('combobox'), 'height')
    const characters = screen.getAllByRole('character-item')

    expect(characters[0]).toHaveTextContent('b')
    expect(characters[1]).toHaveTextContent('a')
    expect(characters[2]).toHaveTextContent('c')
  })

  test('render characters descendingly sorted by their mass ', async () => {
    render(<AllSpecies characters={charactersForSort} />)
    await userEvent.selectOptions(screen.getByRole('combobox'), 'mass')
    const characters = screen.getAllByRole('character-item')

    expect(characters[0]).toHaveTextContent('c')
    expect(characters[1]).toHaveTextContent('b')
    expect(characters[2]).toHaveTextContent('a')
  })

  test('render characters get back to the original order when user select Sort by ', async () => {
    render(<AllSpecies characters={charactersForSort} />)

    // Change order
    await userEvent.selectOptions(screen.getByRole('combobox'), 'mass')

    await userEvent.selectOptions(screen.getByRole('combobox'), 'Sort by')
    const characters = screen.getAllByRole('character-item')

    expect(characters[0]).toHaveTextContent('a')
    expect(characters[1]).toHaveTextContent('b')
    expect(characters[2]).toHaveTextContent('c')
  })
})
