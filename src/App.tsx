import React from 'react'
import { isEmpty } from 'lodash'
import { useAppDispatch } from './store'
import { Tabs, TabList, TabPanels, Tab } from '@chakra-ui/react'
import SpeciesItem from './components/SpeciesItem'
import Layout from './layout/Layout'
import { useGetCharactersQuery, updateFilter } from './api/starWars-api'

function App() {
  const { data, error, isLoading } = useGetCharactersQuery(undefined)
  const dispatch = useAppDispatch()

  // TODO: create these components
  if (isLoading) return <div>Loading</div>
  if (error) return <div>Error</div>
  if (!data || isEmpty(data)) return <div>No data found</div>

  // ⚠️ this is an experimental operation
  const handleClick = () =>
    dispatch(
      updateFilter([
        {
          id: 0,
          name: 'name',
          image: 'image',
          gender: 'gender',
          species: 'speceis',
        },
      ]),
    )
  return (
    <Layout>
      <>
        <button onClick={handleClick}>click</button>
        <Tabs orientation='vertical' height='80vh' overflowY='scroll'>
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
      </>
    </Layout>
  )
}

export default App
