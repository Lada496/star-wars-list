import React, { useReducer } from 'react'
import { Heading, Select } from '@chakra-ui/react'
import { ModifiedCharacter } from '../../api/starWars-types'
import CharacterList from '../CharacterList/CharacterList'
import TabPanelContainer from '../UI/TabPanelContainer'

type AllSpeciesProps = {
  characters: ModifiedCharacter[]
}

type CharacterState = {
  originalCharacters: ModifiedCharacter[]
  modifiedCharacters: ModifiedCharacter[]
  selectedValue: string
}

type Action = { type: 'filter'; event: CharacterState['selectedValue'] }

type Key = 'mass' | 'height'

const sort = (characters: ModifiedCharacter[], key: Key) =>
  characters.sort((a, b) => (b[key] || 0) - (a[key] || 0))

const characterReducer = (state: CharacterState, action: Action): CharacterState => {
  switch (action.type) {
    case 'filter':
      if (action.event === 'height' || action.event === 'mass') {
        const newModifiedCharacters = [...state.modifiedCharacters]
        sort(newModifiedCharacters, action.event)
        return {
          originalCharacters: state.originalCharacters,
          modifiedCharacters: newModifiedCharacters,
          selectedValue: action.event,
        }
      }
      return {
        originalCharacters: state.originalCharacters,
        modifiedCharacters: state.originalCharacters,
        selectedValue: action.event,
      }

    // TODO: add filter logic
    default:
      return state
  }
}

const AllSpecies = ({ characters }: AllSpeciesProps) => {
  const [state, dispatch] = useReducer(characterReducer, {
    originalCharacters: characters,
    modifiedCharacters: characters,
    selectedValue: '',
  })

  return (
    <TabPanelContainer>
      <Heading as='h1' size='lg'>
        All characters
      </Heading>
      <Select
        placeholder='Sort by'
        value={state.selectedValue}
        onChange={(e) => dispatch({ type: 'filter', event: e.target.value })}
      >
        <option value='height'>Height</option>
        <option value='mass'>Mass</option>
      </Select>
      <CharacterList characters={state.modifiedCharacters} />
    </TabPanelContainer>
  )
}

export default AllSpecies
