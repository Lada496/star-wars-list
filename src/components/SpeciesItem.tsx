import React from 'react'
import { TabPanel } from '@chakra-ui/react'
import CharacterList from './CharacterList'
import { ModifiedCharacter } from '../types'

type SpeciesItemProps = {
  name: string
  characters: ModifiedCharacter[]
}

const SpeciesItem = ({ name, characters }: SpeciesItemProps) => {
  return (
    <TabPanel style={{ position: 'fixed' }}>
      <h1>{name}</h1>
      <CharacterList characters={characters} />
    </TabPanel>
  )
}

export default SpeciesItem
