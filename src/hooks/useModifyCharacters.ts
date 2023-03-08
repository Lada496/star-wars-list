import { useReducer } from 'react'

import { ModifiedCharacter } from '../api/starWars-types'

export const CHARACTER_ACTION_TYPES = {
  MODIFY: 'modify',
  RESET: 'reset',
} as const

export const SORT_FACTOR = {
  MASS: 'mass',
  HEIGHT: 'height',
} as const

export const FILTER_FACTOR = {
  HOMEWORLD: 'homeworld',
  GENDER: 'gender',
} as const

// "mass" | "height"
export type SortFactor = typeof SORT_FACTOR[keyof typeof SORT_FACTOR]

export type FilterFactor = typeof FILTER_FACTOR[keyof typeof FILTER_FACTOR]

type CharacterState = {
  originalCharacters: ModifiedCharacter[]
  renderedCharacters: ModifiedCharacter[]
  sortFactor: SortFactor | ''
  homeworldFilters: string[],
  genderFilters:string[]
  homeworldFilterTarget: string
  genderFilterTarget: string
}

type CharacterAction =
  | {
      type: 'modify'
      sortFactor: CharacterState['sortFactor'], homeworldFilterTarget: string, genderFilterTarget: string
    }
  | { type: 'reset'}

const sortCharacters = (characters: ModifiedCharacter[], key: SortFactor) =>
  characters.sort((a, b) => (b[key] || 0) - (a[key] || 0))

const characterReducer = (state: CharacterState, action: CharacterAction): CharacterState => {
  switch (action.type) {
    case CHARACTER_ACTION_TYPES.MODIFY: {
      const homeworldFilterTarget = action.homeworldFilterTarget
      const genderFilterTarget = action.genderFilterTarget
      const sortFactor = action.sortFactor
      let newRenderedCharacters = [...state.originalCharacters]

    if(homeworldFilterTarget) {
      newRenderedCharacters = newRenderedCharacters.filter(character=> character.homeworld === homeworldFilterTarget)
    }

    if(genderFilterTarget) {
      newRenderedCharacters = newRenderedCharacters.filter(character=>character.gender === genderFilterTarget)
    }

    if(sortFactor) {
      newRenderedCharacters = sortCharacters(newRenderedCharacters, sortFactor)
    }

    return {
      ...state,
      renderedCharacters: newRenderedCharacters,
      sortFactor,
      homeworldFilterTarget,
      genderFilterTarget
    }
      
    }

    case CHARACTER_ACTION_TYPES.RESET: 
    return {
      ...state,
      renderedCharacters:state.originalCharacters,
      sortFactor:'',
      homeworldFilterTarget:'',
      genderFilterTarget:''
    }

    default:
      return state
  }
}

function useModifyCharacters(initialState: CharacterState) {
  const [charactersState, dispatch] = useReducer(characterReducer, initialState)

  return { charactersState, dispatch }
}

export default useModifyCharacters
