import React from 'react'
import { ModifiedCharacter } from '../types'

type CharacterItemProps = {
  character: ModifiedCharacter
}

const CharacterItem = ({ character }: CharacterItemProps) => <li>{character.name}</li>

export default CharacterItem
