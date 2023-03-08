import React from 'react'
import { Heading, Box, SimpleGrid } from '@chakra-ui/react'
import { ModifiedCharacter } from '../../api/starWars-types'
import useModifyCharacters, {
  CHARACTER_ACTION_TYPES,
  SORT_FACTOR,
  FILTER_FACTOR,
  SortFactor,
} from '../../hooks/useModifyCharacters'
import { getfilterTargets } from './utils/getFilterTargets'
import CharacterList from '../CharacterList/CharacterList'
import Selector from '../UI/Selector/Selector'

type AllSpeciesProps = {
  characters: ModifiedCharacter[]
}



const AllSpecies = ({ characters }: AllSpeciesProps) => {
  const { charactersState, dispatch } = useModifyCharacters({
    originalCharacters: characters,
    renderedCharacters: characters,
    sortFactor: '',
    homeworldFilters: getfilterTargets(characters, FILTER_FACTOR.HOMEWORLD),
    genderFilters: getfilterTargets(characters, FILTER_FACTOR.GENDER),
    homeworldFilterTarget:'',
    genderFilterTarget: ''
  })

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const usersSortChoice = event.target.value as SortFactor
    dispatch ({ type: CHARACTER_ACTION_TYPES.MODIFY, sortFactor: usersSortChoice, homeworldFilterTarget: charactersState.homeworldFilterTarget,  genderFilterTarget: charactersState.genderFilterTarget})
  }

  const handleHomelandFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const usersHomelandFilterChoice = event.target.value
    dispatch({type: CHARACTER_ACTION_TYPES.MODIFY, sortFactor: charactersState.sortFactor, homeworldFilterTarget: usersHomelandFilterChoice, genderFilterTarget: charactersState.genderFilterTarget})
  }

  const handleGenderFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const usersGenderFilterChoice = event.target.value
    dispatch({type: CHARACTER_ACTION_TYPES.MODIFY, sortFactor: charactersState.sortFactor, homeworldFilterTarget: charactersState.homeworldFilterTarget, genderFilterTarget: usersGenderFilterChoice})
  }

  return (
    <Box>
      <Heading as='h1' size='lg'>
        All characters
      </Heading>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing='10px'>
        <Selector placeholder='Sort by'
          value={charactersState.sortFactor}
          onChange={handleSortChange}
          options={Object.values(SORT_FACTOR)}
          label='sort'/>
        <Selector
          placeholder='Filter by characters homeland'
          value={charactersState.homeworldFilterTarget}
          onChange={handleHomelandFilter}
          options={charactersState.homeworldFilters}
          label='homeland filter'
        />
        <Selector
          placeholder='Filter by characters gender'
          value={charactersState.genderFilterTarget}
          onChange={handleGenderFilter}
          options={charactersState.genderFilters}
          label='gender filter'
        />
      </SimpleGrid>
      {charactersState.renderedCharacters.length > 0 ? (
        <CharacterList characters={charactersState.renderedCharacters} />
      ) : (
        <p>No character matched</p>
      )}
    </Box>
  )
}

export default AllSpecies
