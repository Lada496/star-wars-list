import React from 'react'
import { Box } from '@chakra-ui/react'
import Navigation from './Navigation'
import Footer from './Footer'

type LayoutProps = {
  children: JSX.Element
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navigation />
      <Box as='main' height='80vh' overflowY='scroll'>
        {children}
      </Box>
      <Footer />
    </>
  )
}

export default Layout
