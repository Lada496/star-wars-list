import React, { useState } from 'react'
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
import ListItemWithoutBullet from '../UI/ListItemWithoutBullet'
import CharacterDetails from '../CharacterDetails/CharacterDetails'

type WithoutIdCharacter = Omit<ModifiedCharacter, 'id'>

type CharacterItemProps = {
  character: WithoutIdCharacter
}

const CharacterItem = ({ character }: CharacterItemProps) => {
  // delete id property from details props
  const { name, image, species, gender, ...others } = character
  const [isShowDetails, setIsShowDetails] = useState(false)
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
          <Avatar src={image} size='xl' mb={4} pos='relative' />
          <Heading as='h2' fontSize='xl'>
            {name}
          </Heading>
          <UnorderedList role='character-details'>
            <ListItemWithoutBullet>Species: {species}</ListItemWithoutBullet>
            <ListItemWithoutBullet>Gender: {gender}</ListItemWithoutBullet>
            {character.bmi && <ListItemWithoutBullet>BMI: {character.bmi}</ListItemWithoutBullet>}

            {isShowDetails && <CharacterDetails details={others} />}
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
        </Box>
      </Center>
    </ListItemWithoutBullet>
  )
}

export default CharacterItem
