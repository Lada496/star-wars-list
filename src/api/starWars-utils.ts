import { RowCharacter, ModifiedCharacter, CategorizedCharacters } from './starWars-types'

export const modifyRowCharacters = (characters: RowCharacter[]): ModifiedCharacter[] => {
  const modifiedCharacters: ModifiedCharacter[] = []
  const calcBMI = (height: number, mass: number): number => +(mass / Math.pow(height, 2)).toFixed(2)
  const convertToStarWarsDating = (year: number) =>
    year > 0 ? `${year} ABY` : `${Math.abs(year)} BBY`
  for (const character of characters) {
    const bmi =
      character.height && character.mass ? calcBMI(character.height, character.mass) : undefined
    modifiedCharacters.push({
      id: character.id,
      name: character.name,
      image: character.image,
      gender: character.gender,
      species: character.species,
      ...(bmi && {
        bmi,
        height: character.height,
        mass: character.mass,
      }),
      ...(character.homeworld && { homeworld: character.homeworld }),
      ...(character.born && { born: convertToStarWarsDating(+character.born) }),
      ...(character.died && { died: convertToStarWarsDating(+character.died) }),
    })
  }
  return modifiedCharacters
}

export const categorizeCharacters = (characters: ModifiedCharacter[]): CategorizedCharacters => {
  const categorizedCharacters = characters.reduce(
    (acc: CategorizedCharacters, character: ModifiedCharacter) => {
      if (acc[character.species]) {
        acc[character.species].push(character)
        return acc
      }
      acc[character.species] = [character]
      return acc
    },
    {},
  )
  return categorizedCharacters
}
