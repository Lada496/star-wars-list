import React from 'react'
import { ModifiedCharacter } from '../../api/starWars-types'
import CharacterList from '../CharacterList/CharacterList'
import TabPanelContainer from '../UI/TabPanelContainer'

type AllSpeciesProps = {
  characters: ModifiedCharacter[]
}

const AllSpecies = ({ characters }: AllSpeciesProps) => {
  return (
    <TabPanelContainer>
      <h1>All characters</h1>
      <div>
        <p>sort and filter features will come later</p>
      </div>
      <CharacterList characters={characters} />
    </TabPanelContainer>
  )
}

export default AllSpecies
