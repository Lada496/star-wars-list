import React from 'react'
import { isEmpty } from 'lodash'
import {
  UnorderedList,
  Heading,
  Avatar,
  Box,
  Center,
  Button,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { ModifiedCharacter } from '../../api/starWars-types'
import ListItemWithoutBullet from '../ListItemWithoutBullet/ListItemWithoutBullet'
import ChatacterDetailsModal from '../ChatacterDetailsModal/ChatacterDetailsModal'

export type WithoutIdCharacter = Omit<ModifiedCharacter, 'id'>

type CharacterItemProps = {
  character: WithoutIdCharacter
}

const CharacterItem = ({ character }: CharacterItemProps) => {
  const { name, image, species, gender, ...details } = character
  const hasDetails = !isEmpty(details)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const CommonContent = (
    <>
      <ListItemWithoutBullet>Species: {species}</ListItemWithoutBullet>
      <ListItemWithoutBullet>Gender: {gender}</ListItemWithoutBullet>
      {character.bmi && <ListItemWithoutBullet>BMI: {character.bmi}</ListItemWithoutBullet>}
    </>
  )

  const hasDetailsContent = (
    <>
      <UnorderedList role='character-details'>{CommonContent}</UnorderedList>

      <Button
        mt={5}
        fontSize='sm'
        bg='black.900'
        color='white'
        borderRadius='0'
        _hover={{
          color: 'black.900',
          bg: 'gray.300',
        }}
        onClick={onOpen}
      >
        View details
      </Button>
      <ChatacterDetailsModal isOpen={isOpen} onClose={onClose} character={character} />
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
          borderColor='black.900'
          boxShadow={useColorModeValue('6px 6px 0 #221F20', '6px 6px 0 cyan')}
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
