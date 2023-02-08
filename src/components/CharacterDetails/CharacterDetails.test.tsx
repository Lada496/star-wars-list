import { screen, render } from '@testing-library/react'
import { UnorderedList } from '@chakra-ui/react'
import CharacterDetails, { CharacterDetailsObject } from './CharacterDetails'

const details: CharacterDetailsObject = {
  bmi: 24.68,
  height: 1.72,
  mass: 73,
}

describe('CharacterDetails', () => {
  test('render a character detailes', () => {
    render(
      <UnorderedList>
        <CharacterDetails details={details} />
      </UnorderedList>,
    )
    const detailsItems = screen.getAllByRole('listitem')

    // not render bmi as it is default information
    expect(detailsItems).toHaveLength(2)
  })
  test('render height properly when it is 0 ', () => {
    render(<CharacterDetails details={{ height: 0 }} />)
    const heightIs0m = screen.queryByText(0)
    expect(heightIs0m).not.toBeInTheDocument()
  })
  test('render mass properly when it is 0', () => {
    render(<CharacterDetails details={{ mass: 0 }} />)
    const massIs0kg = screen.queryByText(0)
    expect(massIs0kg).not.toBeInTheDocument()
  })
})
