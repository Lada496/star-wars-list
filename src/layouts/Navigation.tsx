import React from 'react'
import { Box, Image } from '@chakra-ui/react'
import logoImage from '../assets/star-wars-logo.png'

const Navigation = () => {
  return (
    <Box as='header' w='100%' bg='#221F20'>
      <Image src={logoImage} alt='Star Wars logo' htmlWidth='150px' />
    </Box>
  )
}

export default Navigation
