import React, { useState } from 'react'
import { Image } from '@chakra-ui/react'
import { ModifiedCharacter } from '../../api/starWars-types'
import CharacterDetails from '../CharacterDetails/CharacterDetails'

type CharacterItemProps = {
  character: ModifiedCharacter
}

const CharacterItem = ({ character }: CharacterItemProps) => {
  const { name, image, species, gender, ...others } = character
  const [isShowDetails, setIsShowDetails] = useState(false)
  return (
    <li>
      <h2>{name}</h2>
      <Image src={image} alt={name} htmlWidth='200px' />
      <ul role='character-details'>
        <li>Species: {species}</li>
        <li>Gender: {gender}</li>
        {character.bmi && <li>BMI: {character.bmi}</li>}
        <button onClick={() => setIsShowDetails(!isShowDetails)}>
          {isShowDetails ? 'Hide details' : 'View details'}
        </button>
        {isShowDetails && <CharacterDetails details={others} />}
      </ul>
    </li>
  )
}

export default CharacterItem
