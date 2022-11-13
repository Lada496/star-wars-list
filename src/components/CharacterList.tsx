import React from 'react'

import CharacterItem from './CharacterItem'
import { ModifiedCharacter } from '../types'

type CharacterListProps = {
  characters: ModifiedCharacter[]
}

const CharacterList = ({ characters }: CharacterListProps) => {
  return (
    <ul>
      {characters.map((character) => (
        <CharacterItem key={character.id} character={character} />
      ))}
    </ul>
  )
}

export default CharacterList
