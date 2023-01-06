import AllSpecies from './AllSpecies'
import { render, screen } from '@testing-library/react'
import { Tabs, TabPanels } from '@chakra-ui/react'
import { mockModifiedCharacters } from '../../api/mocks/mockModifiedCharacters'

describe('AllSpecies', () => {
  test('render multiple kinds of spiceis characters in one list', () => {
    render(
      <Tabs>
        <TabPanels>
          <AllSpecies characters={mockModifiedCharacters} />
        </TabPanels>
      </Tabs>,
    )
    const humans = screen.getAllByText(/human/i)
    expect(humans.length).toBeGreaterThan(0)
    const droids = screen.getAllByText(/droid/i)
    expect(droids.length).toBeGreaterThan(0)
  })
})
