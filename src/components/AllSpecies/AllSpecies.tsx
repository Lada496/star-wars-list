import React from 'react'
import { Heading, Select, Box } from '@chakra-ui/react'
import { ModifiedCharacter } from '../../api/starWars-types'
import useModifyCharacters, { SORT_FACTOR, SortFactor } from '../../hooks/useModifyCharacters'
import CharacterList from '../CharacterList/CharacterList'

type AllSpeciesProps = {
  characters: ModifiedCharacter[]
}

const AllSpecies = ({ characters }: AllSpeciesProps) => {
  const { state, dispatch } = useModifyCharacters({
    originalCharacters: characters,
    modifiedCharacters: characters,
    selectedValue: '',
  })

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as SortFactor
    dispatch({ type: 'sort', sortFacter: value })
  }

  return (
    <Box>
      <Heading as='h1' size='lg'>
        All characters
      </Heading>
      <Select placeholder='Sort by' value={state.selectedValue} onChange={handleChange}>
        {Object.keys(SORT_FACTOR).map((sortFactorKey) => (
          <option
            key={sortFactorKey}
            value={SORT_FACTOR[sortFactorKey as keyof typeof SORT_FACTOR]}
          >
            {SORT_FACTOR[sortFactorKey as keyof typeof SORT_FACTOR]}
          </option>
        ))}
      </Select>
      <CharacterList characters={state.modifiedCharacters} />
    </Box>
  )
}

export default AllSpecies
