import React from 'react'
import { Tabs, TabList, TabPanels, Tab } from '@chakra-ui/react'
import SpeciesItem from '../components/SpeciesItem'
import { useGetCharactorsQuery } from '../store/starWarsApi-slice'
const Body = () => {
  const { data, error, isLoading } = useGetCharactorsQuery(undefined)

  // TODO: create these components
  if (isLoading) return <div>Loading</div>
  if (error) return <div>Error</div>
  if (!data) return <div>No data found</div>

  return (
    <Tabs orientation='vertical'>
      <TabList>
        {Object.keys(data).map((key) => (
          <Tab key={key}>{key}</Tab>
        ))}
      </TabList>

      <TabPanels>
        {Object.keys(data).map((key) => (
          <SpeciesItem key={key} name={key} characters={data[key]} />
        ))}
      </TabPanels>
    </Tabs>
  )
}

export default Body
