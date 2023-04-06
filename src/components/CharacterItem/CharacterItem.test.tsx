import { render, screen } from '@testing-library/react'
import { UnorderedList } from '@chakra-ui/react'
import CharacterItem, { WithoutIdCharacter } from './CharacterItem'

const withBmiCharacter: WithoutIdCharacter = {
  name: 'Full Name',
  image: 'image.com',
  gender: 'gender',
  species: 'species',
  bmi: 24.68,
  height: 1.72,
  mass: 73,
}

const withoutBmiCharacter: WithoutIdCharacter = {
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

  test('renders properly when no detailed data available', async () => {
    render(
      <UnorderedList>
        <CharacterItem character={withoutBmiCharacter} />
      </UnorderedList>,
    )

    const viewDetailsButton = screen.queryByRole('button', { name: /view details/i })
    const noDetailsDataMessage = screen.getByText(/no detailed data/i)

    expect(viewDetailsButton).not.toBeInTheDocument()
    expect(noDetailsDataMessage).toBeInTheDocument()
  })
})
