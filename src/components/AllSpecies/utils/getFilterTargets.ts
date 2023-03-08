
import { FilterFactor } from "../../../hooks/useModifyCharacters"
import { ModifiedCharacter } from "../../../api/starWars-types"
export const getfilterTargets = (characters: ModifiedCharacter[], filterFactor: FilterFactor) => {
    const filterTargetsObject = characters.reduce(
      (acc: { [key: string]: string }, character: ModifiedCharacter) => {
        const value = character[filterFactor]
        if (!value) {
          return acc
        }
        if (!acc[value]) {
          acc[value] = value
        }
        return acc
      },
      {},
    )
    return Object.keys(filterTargetsObject)
  }