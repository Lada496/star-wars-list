import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
  Stack,
  Image,
  Heading,
  Flex,
  Text,
  Center,
  UnorderedList,
} from '@chakra-ui/react'

import { WithoutIdCharacter } from '../CharacterItem/CharacterItem'
import ListItemWithoutBullet from '../ListItemWithoutBullet/ListItemWithoutBullet'

type ChatacterDetailsModal = {
  character: WithoutIdCharacter
  isOpen: boolean
  onClose: () => void
}

const ChatacterDetailsModal = ({ character, isOpen, onClose }: ChatacterDetailsModal) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Center>
            <Stack
              borderRadius='lg'
              w={{ sm: '100%', md: '540px' }}
              direction={{ base: 'column', md: 'row' }}
              bg={useColorModeValue('white', 'gray.900')}
            >
              <Flex flex={1}>
                <Image
                  objectFit='contain'
                  boxSize='100%'
                  src={character.image}
                  alt={character.name}
                />
              </Flex>
              <Stack
                flex={1}
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                p={1}
                pt={2}
              >
                <Heading fontSize={'2xl'} fontFamily={'body'}>
                  {character.name}
                </Heading>
                <Text
                  fontWeight={600}
                  color={'gray.500'}
                  size='sm'
                  mb={4}
                  textTransform='capitalize'
                >
                  {character.species}
                </Text>
                <Text color={useColorModeValue('gray.700', 'gray.400')} px={3}>
                  <UnorderedList role='character-details'>
                    <ListItemWithoutBullet>Gender: {character.gender}</ListItemWithoutBullet>
                    {character.homeworld && (
                      <ListItemWithoutBullet>
                        Homeworld: {character.homeworld}
                      </ListItemWithoutBullet>
                    )}
                    {character.born && (
                      <ListItemWithoutBullet>Year of birth: {character.born}</ListItemWithoutBullet>
                    )}
                    {character.died && (
                      <ListItemWithoutBullet>
                        Dyear of death: {character.died}
                      </ListItemWithoutBullet>
                    )}
                    {character.height ? (
                      <ListItemWithoutBullet>Height: {character.height} m</ListItemWithoutBullet>
                    ) : null}
                    {character.mass ? (
                      <ListItemWithoutBullet>Weight: {character.mass} kg</ListItemWithoutBullet>
                    ) : null}
                    {character.bmi && (
                      <ListItemWithoutBullet>BMI: {character.bmi}</ListItemWithoutBullet>
                    )}
                  </UnorderedList>
                </Text>
              </Stack>
            </Stack>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ChatacterDetailsModal
