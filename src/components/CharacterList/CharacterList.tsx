import React from 'react'
import { UnorderedList, SimpleGrid } from '@chakra-ui/react'
import CharacterItem from '../CharacterItem/CharacterItem'
import { ModifiedCharacter } from '../../api/starWars-types'

type CharacterListProps = {
  characters: ModifiedCharacter[]
}

const CharacterList = ({ characters }: CharacterListProps) => {
  return (
    <UnorderedList role='characters-list'>
      <SimpleGrid spacing='20px' columns={{ sm: 1, md: 3, lg: 4 }}>
        {characters.map((character) => (
          <CharacterItem key={character.id} character={character} />
        ))}
      </SimpleGrid>
    </UnorderedList>
  )
}

export default CharacterList
