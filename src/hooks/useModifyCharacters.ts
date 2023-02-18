import { useReducer } from 'react'

import { ModifiedCharacter } from '../api/starWars-types'

export const CHARACTER_ACTION_TYPES = {
  SORT: 'sort',
  FILTER: 'filter',
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

type FilterTargets = {
  homelandTarget: string
  genderTarget: string
}

type CharacterState = {
  originalCharacters: ModifiedCharacter[]
  renderedCharacters: ModifiedCharacter[]
  sortFactor: SortFactor | ''
  homeworldFilters: string[]
  genderFilters: string[]
  filterTargets: FilterTargets
}

type CharacterAction =
  | {
      type: 'sort'
      sortFactor: CharacterState['sortFactor']
    }
  | { type: 'filter'; filterFactor: FilterFactor; filterTarget: string }

const sort = (characters: ModifiedCharacter[], key: SortFactor) =>
  characters.sort((a, b) => (b[key] || 0) - (a[key] || 0))

const filter = (characters: ModifiedCharacter[], key: FilterFactor, filterTarget: string) =>
  characters.filter((character) => character[key] === filterTarget)

const hasTarget = (
  filterFactor: FilterFactor,
  previousHomelandTarget: string,
  previousGenderTarget: string,
) => {
  let hasTarget = false
  if (filterFactor === FILTER_FACTOR.HOMEWORLD && previousHomelandTarget !== '') {
    hasTarget = true
  }
  if (filterFactor === FILTER_FACTOR.GENDER && previousGenderTarget !== '') {
    hasTarget = true
  }
  return hasTarget
}

const characterReducer = (state: CharacterState, action: CharacterAction): CharacterState => {
  switch (action.type) {
    case CHARACTER_ACTION_TYPES.SORT: {
      if (action.sortFactor === 'height' || action.sortFactor === 'mass') {
        const newRenderedCharacters = [...state.renderedCharacters]
        sort(newRenderedCharacters, action.sortFactor)
        return {
          ...state,
          renderedCharacters: newRenderedCharacters,
          sortFactor: action.sortFactor,
        }
      }
      const homelandTarget = state.filterTargets.homelandTarget
      const genderTarget = state.filterTargets.genderTarget
      let newRenderedCharacters = state.originalCharacters

      // Check if users have already filtered or not
      if (homelandTarget) {
        newRenderedCharacters = filter(
          newRenderedCharacters,
          FILTER_FACTOR.HOMEWORLD,
          homelandTarget,
        )
      }
      if (genderTarget) {
        newRenderedCharacters = filter(newRenderedCharacters, FILTER_FACTOR.GENDER, genderTarget)
      }
      return {
        ...state,
        sortFactor: action.sortFactor,
        renderedCharacters: newRenderedCharacters,
      }
    }

    case CHARACTER_ACTION_TYPES.FILTER: {
      const filterFactor = action.filterFactor
      const filterTarget = action.filterTarget
      const sortFactor = state.sortFactor
      const previousHomelandTarget = state.filterTargets.homelandTarget
      const previousGenderTarget = state.filterTargets.genderTarget

      // When users choose target: Apply new filter and keep other modifications
      if (filterTarget) {
        let newRenderedCharacters: ModifiedCharacter[]

        // Check if we can use previous renderedCharacters or not
        if (hasTarget(filterFactor, previousHomelandTarget, previousGenderTarget)) {
          // 1. Reset with new filterTarget
          newRenderedCharacters = filter(state.originalCharacters, filterFactor, filterTarget)

          // 2. Get back other modifications
          if (filterFactor === FILTER_FACTOR.HOMEWORLD && previousGenderTarget) {
            newRenderedCharacters = filter(
              newRenderedCharacters,
              FILTER_FACTOR.GENDER,
              previousGenderTarget,
            )
          }

          if (filterFactor === FILTER_FACTOR.GENDER && previousHomelandTarget) {
            newRenderedCharacters = filter(
              newRenderedCharacters,
              FILTER_FACTOR.HOMEWORLD,
              previousHomelandTarget,
            )
          }

          if (sortFactor) {
            sort(newRenderedCharacters, sortFactor)
          }
        } else {
          newRenderedCharacters = filter(state.renderedCharacters, filterFactor, filterTarget)
        }

        return {
          ...state,
          renderedCharacters: newRenderedCharacters,
          filterTargets: {
            homelandTarget:
              filterFactor === FILTER_FACTOR.HOMEWORLD
                ? filterTarget
                : state.filterTargets.homelandTarget,
            genderTarget:
              filterFactor === FILTER_FACTOR.GENDER
                ? filterTarget
                : state.filterTargets.genderTarget,
          },
        }
      }

      // Default: Reset only chosen filterFactor and remain the other filter and sort if necessaru
      // 1. Reset renderedCharacters
      let newRenderedCharacters = state.originalCharacters

      // 2. Get back other modifications
      if (filterFactor === FILTER_FACTOR.HOMEWORLD && previousGenderTarget) {
        newRenderedCharacters = filter(
          newRenderedCharacters,
          FILTER_FACTOR.GENDER,
          previousGenderTarget,
        )
      }

      if (filterFactor === FILTER_FACTOR.GENDER && previousHomelandTarget) {
        newRenderedCharacters = filter(
          newRenderedCharacters,
          FILTER_FACTOR.HOMEWORLD,
          previousHomelandTarget,
        )
      }
      if (sortFactor) {
        newRenderedCharacters = [...newRenderedCharacters]
        sort(newRenderedCharacters, sortFactor)
      }
      return {
        ...state,
        renderedCharacters: newRenderedCharacters,
        filterTargets: {
          homelandTarget:
            filterFactor === FILTER_FACTOR.HOMEWORLD
              ? filterTarget
              : state.filterTargets.homelandTarget,
          genderTarget:
            filterFactor === FILTER_FACTOR.GENDER ? filterTarget : state.filterTargets.genderTarget,
        },
      }
    }

    default:
      return state
  }
}

function useModifyCharacters(initialState: CharacterState) {
  const [state, dispatch] = useReducer(characterReducer, initialState)

  return { state, dispatch }
}

export default useModifyCharacters
