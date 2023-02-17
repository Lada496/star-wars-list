import React from 'react'
import { Heading, Select, Box, SimpleGrid } from '@chakra-ui/react'
import { ModifiedCharacter } from '../../api/starWars-types'
import useModifyCharacters, {
  SORT_FACTOR,
  FILTER_FACTER,
  SortFactor,
  FilterFactor,
} from '../../hooks/useModifyCharacters'
import CharacterList from '../CharacterList/CharacterList'

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
    homeworldFilters: filterTargets(characters, FILTER_FACTER.HOMEWORLD),
    genderFilters: filterTargets(characters, FILTER_FACTER.GENDER),
    filterTargets: {
      homelandTarget: '',
      genderTarget: '',
    },
  })

  console.log(characters.filter((character) => character.gender !== 'male'))

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as SortFactor
    dispatch({ type: 'sort', sortFactor: value })
  }

  const handleHomeworldFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    dispatch({ type: 'filter', filterFactor: FILTER_FACTER.HOMEWORLD, filterTarget: value })
  }

  const handleGengerFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    dispatch({ type: 'filter', filterFactor: FILTER_FACTER.GENDER, filterTarget: value })
  }

  return (
    <Box>
      <Heading as='h1' size='lg'>
        All characters
      </Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing='10px'>
        <Select placeholder='Sort by' value={state.sortFactor} onChange={handleSortChange}>
          {Object.keys(SORT_FACTOR).map((sortFactorKey) => (
            <option
              key={sortFactorKey}
              value={SORT_FACTOR[sortFactorKey as keyof typeof SORT_FACTOR]}
            >
              {SORT_FACTOR[sortFactorKey as keyof typeof SORT_FACTOR]}
            </option>
          ))}
        </Select>
        <Select
          placeholder='Filter by characters homeland'
          value={state.filterTargets.homelandTarget}
          onChange={handleHomeworldFilter}
        >
          {state.homeworldFilters.map((filterElement) => (
            <option key={filterElement} value={filterElement}>
              {filterElement}
            </option>
          ))}
        </Select>
        <Select
          placeholder='Filter by characters gender'
          value={state.filterTargets.genderTarget}
          onChange={handleGengerFilter}
        >
          {state.genderFilters.map((filterElement) => (
            <option key={filterElement} value={filterElement}>
              {filterElement}
            </option>
          ))}
        </Select>
      </SimpleGrid>
      <CharacterList characters={state.renderedCharacters} />
    </Box>
  )
}

export default AllSpecies
