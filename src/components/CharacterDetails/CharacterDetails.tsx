import React from 'react'
import { isEmpty } from 'lodash'

export type CharacterDetailsObject = {
  bmi?: number
  height?: number
  mass?: number
  homeworld?: string
  born?: string
  died?: string
}

type CharacterItemProps = {
  details: CharacterDetailsObject
}

const CharacterDetails = ({ details }: CharacterItemProps) => {
  if (isEmpty(details)) return <p>No detailed Data</p>

  return (
    <>
      {details.homeworld && <li>Homeworld: {details.homeworld}</li>}
      {details.born && <li>Year of birth: {details.born}</li>}
      {details.died && <li>Dyear of death: {details.died}</li>}
      {details.height && <li>Height: {details.height} m</li>}
      {details.mass && <li>Weight: {details.mass} kg</li>}
    </>
  )
}

export default CharacterDetails
