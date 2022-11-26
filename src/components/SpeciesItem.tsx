import React from 'react'
import { TabPanel } from '@chakra-ui/react'
import CharacterList from './CharacterList'
import { ModifiedCharacter } from '../api/starWars-types'

type SpeciesItemProps = {
  name: string
  characters: ModifiedCharacter[]
}

const SpeciesItem = ({ name, characters }: SpeciesItemProps) => {
  return (
    <TabPanel position='fixed' height='80vh' overflowY='scroll' w='100%'>
      <h1>{name}</h1>
      <CharacterList characters={characters} />
    </TabPanel>
  )
}

export default SpeciesItem
