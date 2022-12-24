import React from 'react'
import { Heading } from '@chakra-ui/react'
import CharacterList from '../CharacterList/CharacterList'
import { ModifiedCharacter } from '../../api/starWars-types'
import TabPanelContainer from '../UI/TabPanelContainer'

type SpeciesItemProps = {
  name: string
  characters: ModifiedCharacter[]
}

const SpeciesItem = ({ name, characters }: SpeciesItemProps) => {
  return (
    <TabPanelContainer>
      <Heading as='h1' size='lg' textTransform='capitalize'>
        {name}
      </Heading>
      <CharacterList characters={characters} />
    </TabPanelContainer>
  )
}

export default SpeciesItem
