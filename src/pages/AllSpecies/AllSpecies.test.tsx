import AllSpecies from './AllSpecies'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockModifiedCharacters } from '../../api/mocks/mockModifiedCharacters'

const mockCharacters = [
  {
    id: 1,
    name: 'Luke Skywalker',
    image: 'https://swapi.dev/api/people/1/',
    gender: 'male',
    species: 'Human',
    bmi: 23.54,
    height: 172,
    mass: 77,
    homeworld: 'Tatooine',
    born: '19BBY',
  },
  {
    id: 2,
    name: 'Leia Organa',
    image: 'https://swapi.dev/api/people/5/',
    gender: 'female',
    species: 'Human',
    bmi: 21.34,
    height: 150,
    mass: 49,
    homeworld: 'Alderaan',
    born: '19BBY',
  },
  {
    id: 3,
    name: 'Darth Vader',
    image: 'https://swapi.dev/api/people/4/',
    gender: 'male',
    species: 'Human',
    bmi: 31.23,
    height: 202,
    mass: 136,
    homeworld: 'Tatooine',
    born: '41.9BBY',
    died: '4ABY',
  },
  {
    id: 4,
    name: 'Chewbacca',
    image: 'https://swapi.dev/api/people/13/',
    gender: 'male',
    species: 'Wookiee',
    bmi: 31.68,
    height: 228,
    mass: 112,
    homeworld: 'Kashyyyk',
    born: '200BBY',
  },
]

const testFiltersAndSorts = (
  renderedCharacters: HTMLElement[],
  modifiedCharactersName: string[],
) => {
  expect(renderedCharacters).toHaveLength(modifiedCharactersName.length)

  for (let i = 0; i < modifiedCharactersName.length; i++) {
    expect(renderedCharacters[i]).toHaveTextContent(modifiedCharactersName[i])
  }
}

describe('AllSpecies', () => {
  test('render multiple kinds of spiceis characters in one list', () => {
    render(<AllSpecies characters={mockModifiedCharacters} />)
    const humans = screen.getAllByText(/human/i)
    expect(humans.length).toBeGreaterThan(0)
    const droids = screen.getAllByText(/droid/i)
    expect(droids.length).toBeGreaterThan(0)
  })
})

describe('AllSpecies | tests for filters and sorts', () => {
  test('render characters filtered by homeworld with no sort ', () => {
    render(<AllSpecies characters={mockCharacters} />)
    userEvent.selectOptions(screen.getByLabelText('homeland filter'), mockCharacters[0].homeworld)

    const homelandFilter = mockCharacters.filter(
      (character) => character.homeworld === mockCharacters[0].homeworld,
    )

    const characters = screen.getAllByRole('character-item')
    const characterNames = homelandFilter.map((character) => character.name)

    testFiltersAndSorts(characters, characterNames)
  })

  test('render characters filtered by gender with no sort', () => {
    render(<AllSpecies characters={mockCharacters} />)

    userEvent.selectOptions(screen.getByLabelText('gender filter'), 'male')

    const genderFilter = mockCharacters.filter((character) => character.gender === 'male')

    const characters = screen.getAllByRole('character-item')
    const characterNames = genderFilter.map((character) => character.name)

    testFiltersAndSorts(characters, characterNames)
  })

  test('render characters with both gender and homeworld filters and no sort', () => {
    render(<AllSpecies characters={mockCharacters} />)

    userEvent.selectOptions(screen.getByLabelText('gender filter'), 'male')
    userEvent.selectOptions(screen.getByLabelText('homeland filter'), mockCharacters[0].homeworld)

    const homelandFilter = mockCharacters.filter(
      (character) => character.homeworld === mockCharacters[0].homeworld,
    )

    const characterNames = homelandFilter.map((character) => character.name)
    const characters = screen.getAllByRole('character-item')

    testFiltersAndSorts(characters, characterNames)
  })

  test('render characters sorted by height', () => {
    render(<AllSpecies characters={mockCharacters} />)
    userEvent.selectOptions(screen.getByLabelText('sort'), 'height')

    const heightSort = [...mockCharacters].sort((a, b) => b.height - a.height)

    const characterNames = heightSort.map((character) => character.name)
    const characters = screen.getAllByRole('character-item')

    testFiltersAndSorts(characters, characterNames)
  })

  test('render characters sorted by height and filtered by homeland', () => {
    render(<AllSpecies characters={mockCharacters} />)

    userEvent.selectOptions(screen.getByLabelText('sort'), 'height')
    userEvent.selectOptions(screen.getByLabelText('homeland filter'), mockCharacters[0].homeworld)

    const heightSortHomelandFilter = mockCharacters
      .filter((character) => character.homeworld === mockCharacters[0].homeworld)
      .sort((a, b) => b.height - a.height)

    const characterNames = heightSortHomelandFilter.map((character) => character.name)
    const characters = screen.getAllByRole('character-item')

    testFiltersAndSorts(characters, characterNames)
  })

  test('render characters sorted by height and filtered by gender', () => {
    render(<AllSpecies characters={mockCharacters} />)

    userEvent.selectOptions(screen.getByLabelText('sort'), 'height')
    userEvent.selectOptions(screen.getByLabelText('gender filter'), 'male')

    const heightSortGenderFilter = mockCharacters
      .filter((character) => character.gender === mockCharacters[0].gender)
      .sort((a, b) => b.height - a.height)

    const characterNames = heightSortGenderFilter.map((character) => character.name)
    const characters = screen.getAllByRole('character-item')

    testFiltersAndSorts(characters, characterNames)
  })

  test('render characters sorted by height with both gender and homeland filters', () => {
    render(<AllSpecies characters={mockCharacters} />)

    userEvent.selectOptions(screen.getByLabelText('sort'), 'height')
    userEvent.selectOptions(screen.getByLabelText('gender filter'), 'male')
    userEvent.selectOptions(screen.getByLabelText('homeland filter'), mockCharacters[0].homeworld)

    const heightSortGenderAndHomelandFilter = mockCharacters
      .filter((character) => character.gender === 'male')
      .filter((character) => character.homeworld === mockCharacters[0].homeworld)
      .sort((a, b) => b.height - a.height)

    const characterNames = heightSortGenderAndHomelandFilter.map((character) => character.name)
    const characters = screen.getAllByRole('character-item')

    testFiltersAndSorts(characters, characterNames)
  })

  test('render characters sorted by mass with no filter', () => {
    render(<AllSpecies characters={mockCharacters} />)

    userEvent.selectOptions(screen.getByLabelText('sort'), 'mass')

    const massSort = [...mockCharacters].sort((a, b) => b.mass - a.mass)

    const characterNames = massSort.map((character) => character.name)
    const characters = screen.getAllByRole('character-item')

    testFiltersAndSorts(characters, characterNames)
  })

  test('render characters sorted by mass with homeland filter', () => {
    render(<AllSpecies characters={mockCharacters} />)

    userEvent.selectOptions(screen.getByLabelText('sort'), 'mass')
    userEvent.selectOptions(screen.getByLabelText('homeland filter'), mockCharacters[0].homeworld)

    const massSortHomelandFilter = mockCharacters
      .filter((character) => character.homeworld === mockCharacters[0].homeworld)
      .sort((a, b) => b.mass - a.mass)

    const characterNames = massSortHomelandFilter.map((character) => character.name)
    const characters = screen.getAllByRole('character-item')

    testFiltersAndSorts(characters, characterNames)
  })

  test('render characters sorted by mass with gender filter', () => {
    render(<AllSpecies characters={mockCharacters} />)

    userEvent.selectOptions(screen.getByLabelText('sort'), 'mass')
    userEvent.selectOptions(screen.getByLabelText('gender filter'), 'male')

    const massSortGenderFilter = mockCharacters
      .filter((character) => character.gender === 'male')
      .sort((a, b) => b.mass - a.mass)

    const characterNames = massSortGenderFilter.map((character) => character.name)
    const characters = screen.getAllByRole('character-item')

    testFiltersAndSorts(characters, characterNames)
  })

  test('render characters sorted by mass with both gender and homeland filters', () => {
    render(<AllSpecies characters={mockCharacters} />)

    userEvent.selectOptions(screen.getByLabelText('sort'), 'mass')
    userEvent.selectOptions(screen.getByLabelText('homeland filter'), mockCharacters[0].homeworld)
    userEvent.selectOptions(screen.getByLabelText('gender filter'), 'male')

    const massSortHomelandGenderFilter = mockCharacters
      .filter((character) => character.gender === 'male')
      .filter((character) => character.homeworld === mockCharacters[0].homeworld)
      .sort((a, b) => b.mass - a.mass)

    const characterNames = massSortHomelandGenderFilter.map((character) => character.name)
    const characters = screen.getAllByRole('character-item')

    testFiltersAndSorts(characters, characterNames)
  })

  test('reset all filters and sorts when users click reset button', () => {
    render(<AllSpecies characters={mockCharacters} />)

    // Filters and Sorts event
    userEvent.selectOptions(screen.getByLabelText('sort'), 'mass')
    userEvent.selectOptions(screen.getByLabelText('homeland filter'), mockCharacters[0].homeworld)
    userEvent.selectOptions(screen.getByLabelText('gender filter'), 'male')

    // Reset event
    userEvent.click(screen.getByLabelText('reset all'))

    const characters = screen.getAllByRole('character-item')
    const charactersName = mockCharacters.map((character) => character.name)

    testFiltersAndSorts(characters, charactersName)
  })
})

describe('AllSpecies | tests for "React all" button', () => {
  test('the reset button is not renderd by default', () => {
    render(<AllSpecies characters={mockCharacters} />)

    const resetAllButton = screen.queryByLabelText('reset all')

    expect(resetAllButton).not.toBeInTheDocument()
  })

  test('the reset button appears once users filter/sort the characters list', () => {
    render(<AllSpecies characters={mockCharacters} />)
    userEvent.selectOptions(screen.getByLabelText('homeland filter'), mockCharacters[0].homeworld)

    const resetAllButton = screen.getByLabelText('reset all')

    expect(resetAllButton).toBeInTheDocument()
  })

  test('the reset button disappears once users get back all filters and the sort to be the default state', () => {
    render(<AllSpecies characters={mockCharacters} />)
    userEvent.selectOptions(screen.getByLabelText('homeland filter'), mockCharacters[0].homeworld)

    const resetAllButton = screen.getByLabelText('reset all')

    expect(resetAllButton).toBeInTheDocument()

    userEvent.click(resetAllButton)

    expect(screen.queryByLabelText('reset all')).not.toBeInTheDocument()
  })
})
