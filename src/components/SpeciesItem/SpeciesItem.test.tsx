import { render, screen } from '@testing-library/react'
import { Tabs, TabPanels } from '@chakra-ui/react'
import SpeciesItem from './SpeciesItem'
import { mockModifiedHumans } from '../../api/mocks/mockModifiedHumans'

describe('SpeciesItem', () => {
  test('renders a species list', () => {
    render(
      <Tabs>
        <TabPanels>
          <SpeciesItem name='human' characters={mockModifiedHumans} />
        </TabPanels>
      </Tabs>,
    )
    const speciesName = screen.getByRole('heading', { level: 1, name: /human/i })
    expect(speciesName).toBeInTheDocument()
    const characterselement = screen.getByRole('characters-list')
    expect(characterselement).toBeInTheDocument()
  })
})
