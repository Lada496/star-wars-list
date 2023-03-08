import React from 'react'
import { Spinner, Center } from '@chakra-ui/react'

const LoadingSpinner = () => {
  return (
    <Center p={10}>
      <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' size='xl' />
    </Center>
  )
}

export default LoadingSpinner
