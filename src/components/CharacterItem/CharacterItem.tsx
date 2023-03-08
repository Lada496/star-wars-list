import React, { useState } from 'react'
import { isEmpty } from 'lodash'
import {
  UnorderedList,
  Heading,
  Avatar,
  Box,
  Center,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import { ModifiedCharacter } from '../../api/starWars-types'
import ListItemWithoutBullet from '../UI/ListItemWithoutBullet/ListItemWithoutBullet'
import CharacterDetails from '../CharacterDetails/CharacterDetails'

export type WithoutIdCharacter = Omit<ModifiedCharacter, 'id'>

type CharacterItemProps = {
  character: WithoutIdCharacter
}

const CharacterItem = ({ character }: CharacterItemProps) => {
  const { name, image, species, gender, ...details } = character
  const hasDetails = !isEmpty(details)
  const [isShowDetails, setIsShowDetails] = useState(false)

  const CommonContent = (
    <>
      <ListItemWithoutBullet>Species: {species}</ListItemWithoutBullet>
      <ListItemWithoutBullet>Gender: {gender}</ListItemWithoutBullet>
      {character.bmi && <ListItemWithoutBullet>BMI: {character.bmi}</ListItemWithoutBullet>}
    </>
  )

  const hasDetailsContent = (
    <>
      <UnorderedList role='character-details'>
        {CommonContent}
        {isShowDetails && <CharacterDetails details={details} />}
      </UnorderedList>

      <Button
        mt={5}
        fontSize='sm'
        bg='black'
        color='white'
        borderRadius='0'
        _hover={{
          color: 'black',
          bg: 'gray.300',
        }}
        onClick={() => setIsShowDetails(!isShowDetails)}
      >
        {isShowDetails ? 'Hide details' : 'View details'}
      </Button>
    </>
  )

  const noDetailsContent = (
    <>
      <UnorderedList role='character-details'>
        {CommonContent}
        <>No Detailed Data</>
      </UnorderedList>
    </>
  )

  return (
    <ListItemWithoutBullet>
      <Center py={6} role='character-item'>
        <Box
          w='240px'
          h='320px'
          bg={useColorModeValue('white', 'gray.900')}
          overflow='scroll'
          rounded={'sm'}
          p={6}
          textAlign={'center'}
          border={'1px'}
          borderColor='black'
          boxShadow={useColorModeValue('6px 6px 0 black', '6px 6px 0 cyan')}
        >
          <Avatar src={image} size='xl' mb={4} pos='relative' border='2px solid #E2E8F0' />
          <Heading as='h2' fontSize='xl'>
            {name}
          </Heading>
          {hasDetails ? hasDetailsContent : noDetailsContent}
        </Box>
      </Center>
    </ListItemWithoutBullet>
  )
}

export default CharacterItem
