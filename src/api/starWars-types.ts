export type RowCharacter = {
  id: number
  name: string
  height?: number
  mass?: number
  gender: string
  homeworld?: string
  wiki: string
  image: string
  born?: number
  bornLocation?: string
  died?: number
  diedLocation?: string
  species: string
  hairColor?: string
  eyeColor: string
  skinColor?: string
  cybernetics?: string
  affiliations: string[]
  masters?: string[] | string
  apprentices?: string[]
  formerAffiliations: string[]
  dateCreated?: number
  dateDestroyed?: number
  destroyedLocation?: string
  creator?: string
  manufacturer?: string
  model?: string
  class?: string
  sensorColor?: string
  platingColor?: string
  equipment?: string | string[]
  productLine?: string
  kajidic?: string
  era?: string[]
  degree?: string
  armament?: string[]
}

export type ModifiedCharacter = {
  id: number
  name: string
  image: string
  gender: string
  species: string
  bmi?: number
  height?: number
  mass?: number
  homeworld?: string
  born?: string
  died?: string
}

export type CharactersBySpecies = {
  [species: string]: ModifiedCharacter[]
}
