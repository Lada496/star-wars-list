import { render, screen } from '@testing-library/react'
import { Tabs, TabPanels } from '@chakra-ui/react'
import SpeciesItem from '../SpeciesItem'
import { modifiedCharacters } from './mocks/modifiedCharacters'

describe('SpeciesItem', () => {
  test('renders a species list', () => {
    render(
      <Tabs>
        <TabPanels>
          <SpeciesItem name='human' characters={modifiedCharacters} />
        </TabPanels>
      </Tabs>,
    )
    const speciesName = screen.getByText(/human/i)
    expect(speciesName).toBeInTheDocument()
    const characterselement = screen.getByRole('list')
    expect(characterselement).toBeInTheDocument()
  })
})
