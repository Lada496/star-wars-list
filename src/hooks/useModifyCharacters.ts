import { useReducer } from 'react'

import { ModifiedCharacter } from '../api/starWars-types'

export const SORT_FACTOR = {
  MASS: 'mass',
  HEIGHT: 'height',
} as const

// "mass" | "height"
export type SortFactor = typeof SORT_FACTOR[keyof typeof SORT_FACTOR]

type CharacterState = {
  originalCharacters: ModifiedCharacter[]
  modifiedCharacters: ModifiedCharacter[]
  selectedValue: SortFactor | ''
}

type CharacterAction = { type: 'sort'; sortFactor: CharacterState['selectedValue'] }

const sort = (characters: ModifiedCharacter[], key: SortFactor) =>
  characters.sort((a, b) => (b[key] || 0) - (a[key] || 0))

const characterReducer = (state: CharacterState, action: CharacterAction): CharacterState => {
  switch (action.type) {
    case 'sort':
      if (action.sortFactor === 'height' || action.sortFactor === 'mass') {
        const newModifiedCharacters = [...state.modifiedCharacters]
        sort(newModifiedCharacters, action.sortFactor)
        return {
          originalCharacters: state.originalCharacters,
          modifiedCharacters: newModifiedCharacters,
          selectedValue: action.sortFactor,
        }
      }
      return {
        originalCharacters: state.originalCharacters,
        modifiedCharacters: state.originalCharacters,
        selectedValue: action.sortFactor,
      }

    // TODO: add filter logic
    default:
      return state
  }
}

function useModifyCharacters(initialState: CharacterState) {
  const [state, dispatch] = useReducer(characterReducer, initialState)

  return { state, dispatch }
}

export default useModifyCharacters
