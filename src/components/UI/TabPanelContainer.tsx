import React from 'react'
import { TabPanel } from '@chakra-ui/react'

type TabTabPanelContainerPops = {
  children: JSX.Element[]
}

const TabPanelContainer = ({ children }: TabTabPanelContainerPops) => {
  return (
    <TabPanel position='fixed' height='80vh' overflowY='scroll' w='100%'>
      {children}
    </TabPanel>
  )
}

export default TabPanelContainer
