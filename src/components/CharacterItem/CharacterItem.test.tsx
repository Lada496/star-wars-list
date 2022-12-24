import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UnorderedList } from '@chakra-ui/react'
import { ModifiedCharacter } from '../../api/starWars-types'
import CharacterItem from './CharacterItem'

const withBmiCharacter: ModifiedCharacter = {
  id: 1,
  name: 'Full Name',
  image: 'image.com',
  gender: 'gender',
  species: 'species',
  bmi: 24.68,
  height: 1.72,
  mass: 73,
}

const withoutBmiCharacter: ModifiedCharacter = {
  id: 1,
  name: 'Full Name',
  image: 'image.com',
  gender: 'gender',
  species: 'species',
}

describe('CharacterItem', () => {
  test('renders a character item with bmi if they have', () => {
    render(
      <UnorderedList>
        <CharacterItem character={withBmiCharacter} />
      </UnorderedList>,
    )
    const character = screen.getByText(withBmiCharacter.name)
    expect(character).toBeInTheDocument()
    const bmi = screen.getByText(/bmi/i)
    expect(bmi).toBeInTheDocument()
  })

  test('renders a character item witout bmi if not', () => {
    render(
      <UnorderedList>
        <CharacterItem character={withoutBmiCharacter} />
      </UnorderedList>,
    )
    const bmi = screen.queryByText(/bmi/i)
    expect(bmi).not.toBeInTheDocument()
  })

  test('show details when users click the button and hide them when users click it again', async () => {
    render(
      <UnorderedList>
        <CharacterItem character={withBmiCharacter} />
      </UnorderedList>,
    )
    const viewDetailsButton = screen.getByRole('button', { name: /view details/i })

    // show details
    userEvent.click(viewDetailsButton)
    const height = await screen.findByText(/height/i)
    expect(height).toBeInTheDocument()
    const hideDetailsButton = await screen.getByRole('button', { name: /hide details/i })

    // hide details
    userEvent.click(hideDetailsButton)
    const noHeight = await screen.queryByText(/height/i)
    expect(noHeight).not.toBeInTheDocument()
  })
})
