import React from 'react'
import { Heading, Box } from '@chakra-ui/react'
import CharacterList from '../CharacterList/CharacterList'
import { ModifiedCharacter } from '../../api/starWars-types'

type SpeciesItemProps = {
  name: string
  characters: ModifiedCharacter[]
}

const SpeciesItem = ({ name, characters }: SpeciesItemProps) => {
  return (
    <Box>
      <Heading as='h1' size='lg' textTransform='capitalize'>
        {name}
      </Heading>
      <CharacterList characters={characters} />
    </Box>
  )
}

export default SpeciesItem
