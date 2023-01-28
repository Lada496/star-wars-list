import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

    const viewDetailsButton = await screen.queryByRole('button', { name: /view details/i })
    const noDetailsDataMessage = screen.getByText(/no detailed data/i)

    expect(viewDetailsButton).not.toBeInTheDocument()
    expect(noDetailsDataMessage).toBeInTheDocument()
  })

  test('show details when users click the button and hide them when users click it again', async () => {
    render(
      <UnorderedList>
        <CharacterItem character={withBmiCharacter} />
      </UnorderedList>,
    )
    // Assign - grab all expected elements to be used in the test
    const viewDetailsButton = screen.getByRole('button', { name: /view details/i })

    // Act - interact by pressing button
    userEvent.click(viewDetailsButton)

    // Assign
    const height = await screen.queryByText(/height/i)

    // Assert - make sure the height element is in the screen
    expect(height).toBeInTheDocument()

    // Assign - hide details
    const hideDetailsButton = await screen.getByRole('button', { name: /hide details/i })

    // Act
    userEvent.click(hideDetailsButton)

    // Assert - no hight button
    expect(height).not.toBeInTheDocument()
  })
})
