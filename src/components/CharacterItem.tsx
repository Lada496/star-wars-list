import React, { useState } from 'react'
import { Image } from '@chakra-ui/react'
import { ModifiedCharacter } from '../api/starWars-types'
import CharacterDetails from './CharacterDetails'

type CharacterItemProps = {
  character: ModifiedCharacter
}

const CharacterItem = ({ character }: CharacterItemProps) => {
  const { name, image, species, gender, ...others } = character
  const [showDetails, setShowDetails] = useState(false)
  return (
    <li>
      <h2>{name}</h2>
      <Image src={image} alt={name} htmlWidth='200px' />
      <ul role='character-details'>
        <li>Species: {species}</li>
        <li>Gender: {gender}</li>
        {character.bmi && <li>BMI: {character.bmi}</li>}
        <button onClick={() => setShowDetails(!showDetails)}>View details</button>
        {showDetails && <CharacterDetails details={others} />}
      </ul>
    </li>
  )
}

export default CharacterItem
