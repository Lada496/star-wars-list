import React from 'react'
import { Grid, Box } from '@chakra-ui/react'

import TabList from '../TabList/TabList'

type TabsProps = {
  children: JSX.Element
  tabKeys: string[]
}

const Tabs = ({ children, tabKeys }: TabsProps) => {
  return (
    <Grid templateColumns='120px auto'>
      <TabList tabKeys={tabKeys} />
      <Box overflowY='scroll' height='90vh' px={5}>
        {children}
      </Box>
    </Grid>
  )
}

export default Tabs
