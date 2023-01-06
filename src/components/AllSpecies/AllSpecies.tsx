import React from 'react'
import { Heading } from '@chakra-ui/react'
import { ModifiedCharacter } from '../../api/starWars-types'
import CharacterList from '../CharacterList/CharacterList'
import TabPanelContainer from '../UI/TabPanelContainer'

type AllSpeciesProps = {
  characters: ModifiedCharacter[]
}

const AllSpecies = ({ characters }: AllSpeciesProps) => {
  return (
    <TabPanelContainer>
      <Heading as='h1' size='lg'>
        All characters
      </Heading>
      <div>
        <p>sort and filter features will come later</p>
      </div>
      <CharacterList characters={characters} />
    </TabPanelContainer>
  )
}

export default AllSpecies
