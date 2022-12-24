import React from 'react'
import { TabPanel } from '@chakra-ui/react'

type TabTabPanelContainerPops = {
  children: JSX.Element[]
}

const TabPanelContainer = ({ children }: TabTabPanelContainerPops) => (
  <TabPanel position='fixed' height='80vh' overflowY='scroll' pt={0} pb={10}>
    {children}
  </TabPanel>
)

export default TabPanelContainer
