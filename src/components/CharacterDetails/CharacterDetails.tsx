import React from 'react'

import ListItemWithoutBullet from '../UI/ListItemWithoutBullet/ListItemWithoutBullet'

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
  return (
    <>
      {details.homeworld && (
        <ListItemWithoutBullet>Homeworld: {details.homeworld}</ListItemWithoutBullet>
      )}
      {details.born && <ListItemWithoutBullet>Year of birth: {details.born}</ListItemWithoutBullet>}
      {details.died && (
        <ListItemWithoutBullet>Dyear of death: {details.died}</ListItemWithoutBullet>
      )}
      {/* assuning we have no character who has 0 m of height nor 0 kg of mass  */}
      {details.height ? (
        <ListItemWithoutBullet>Height: {details.height} m</ListItemWithoutBullet>
      ) : null}
      {details.mass ? (
        <ListItemWithoutBullet>Weight: {details.mass} kg</ListItemWithoutBullet>
      ) : null}
    </>
  )
}

export default CharacterDetails
