import { render, screen } from '@testing-library/react'
import SpeciesItem from './SpeciesItem'
import { mockModifiedHumans } from '../../api/mocks/mockModifiedHumans'

describe('SpeciesItem', () => {
  test('renders a species list', () => {
    render(<SpeciesItem name='human' characters={mockModifiedHumans} />)
    const speciesName = screen.getByRole('heading', { level: 1, name: /human/i })
    expect(speciesName).toBeInTheDocument()
    const characterselement = screen.getByRole('characters-list')
    expect(characterselement).toBeInTheDocument()
  })
})
