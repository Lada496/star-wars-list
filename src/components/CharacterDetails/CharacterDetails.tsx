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
      {/* assuning we have no character who has 0 m of height nor 0 kg of mass  */}
      {details.height ? <li>Height: {details.height} m</li> : null}
      {details.mass ? <li>Weight: {details.mass} kg</li> : null}
    </>
  )
}

export default CharacterDetails
