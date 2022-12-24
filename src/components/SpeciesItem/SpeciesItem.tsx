import React from 'react'
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
      <h1>{name}</h1>
      <CharacterList characters={characters} />
    </TabPanelContainer>
  )
}

export default SpeciesItem
