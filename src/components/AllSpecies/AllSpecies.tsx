import React from 'react'
import { Heading, Select, Box, SimpleGrid } from '@chakra-ui/react'
import { ModifiedCharacter } from '../../api/starWars-types'
import useModifyCharacters, {
  SORT_FACTOR,
  FILTER_FACTOR,
  SortFactor,
  FilterFactor,
} from '../../hooks/useModifyCharacters'
import CharacterList from '../CharacterList/CharacterList'
import Selector from '../UI/Selector/Selector'

type AllSpeciesProps = {
  characters: ModifiedCharacter[]
}

const filterTargets = (characters: ModifiedCharacter[], filterFactor: FilterFactor) => {
  const filterTargetsObject = characters.reduce(
    (acc: { [key: string]: string }, character: ModifiedCharacter) => {
      const value = character[filterFactor]
      if (!value || typeof value === 'undefined') {
        return acc
      } else if (!acc[value]) {
        acc[value] = value
      }
      return acc
    },
    {},
  )
  return Object.keys(filterTargetsObject)
}

const AllSpecies = ({ characters }: AllSpeciesProps) => {
  const { state, dispatch } = useModifyCharacters({
    originalCharacters: characters,
    renderedCharacters: characters,
    sortFactor: '',
    homeworldFilters: filterTargets(characters, FILTER_FACTOR.HOMEWORLD),
    genderFilters: filterTargets(characters, FILTER_FACTOR.GENDER),
    filterTargets: {
      homelandTarget: '',
      genderTarget: '',
    },
  })

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as SortFactor
    dispatch({ type: 'sort', sortFactor: value })
  }

  const handleHomelandFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    dispatch({ type: 'filter', filterFactor: FILTER_FACTOR.HOMEWORLD, filterTarget: value })
  }

  const handleGenderFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    dispatch({ type: 'filter', filterFactor: FILTER_FACTOR.GENDER, filterTarget: value })
  }

  return (
    <Box>
      <Heading as='h1' size='lg'>
        All characters
      </Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing='10px'>
        <Select
          placeholder='Sort by'
          value={state.sortFactor}
          onChange={handleSortChange}
          aria-label='sort'
        >
          {Object.values(SORT_FACTOR).map((sortFactor) => (
            <option key={sortFactor} value={sortFactor}>
              {sortFactor}
            </option>
          ))}
        </Select>
        <Selector
          placeholder='Filter by characters homeland'
          value={state.filterTargets.homelandTarget}
          onChange={handleHomelandFilter}
          options={state.homeworldFilters}
          label='homeland filter'
        />
        <Selector
          placeholder='Filter by characters gender'
          value={state.filterTargets.genderTarget}
          onChange={handleGenderFilter}
          options={state.genderFilters}
          label='gender filter'
        />
      </SimpleGrid>
      {state.renderedCharacters.length > 0 ? (
        <CharacterList characters={state.renderedCharacters} />
      ) : (
        <p>No character matched</p>
      )}
    </Box>
  )
}

export default AllSpecies
