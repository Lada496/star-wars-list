import { screen, render } from '@testing-library/react'
import CharacterDetails, { CharacterDetailsObject } from './CharacterDetails'

const details: CharacterDetailsObject = {
  bmi: 24.68,
  height: 1.72,
  mass: 73,
}

describe('CharacterDetails', () => {
  test('render a character detailes', () => {
    render(<CharacterDetails details={details} />)
    const detailsItems = screen.getAllByRole('listitem')

    // not render bmi as it is default information
    expect(detailsItems).toHaveLength(2)
  })
  test('render no detailed data message when empty object', () => {
    render(<CharacterDetails details={{}} />)
    const noDataMessage = screen.getByText(/no detailed data/i)
    expect(noDataMessage).toBeInTheDocument()
  })
})
