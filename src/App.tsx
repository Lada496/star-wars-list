import React from 'react'
import { isEmpty } from 'lodash'
import { useAppDispatch } from './store'
import { Tabs, TabList, TabPanels, Tab, Text } from '@chakra-ui/react'
import SpeciesItem from './components/SpeciesItem/SpeciesItem'
import Layout from './layouts/PageContainer'
import { useGetCharactersQuery, updateFilter } from './api/starWars-api'
import AllSpecies from './components/AllSpecies/AllSpecies'

function App() {
  const { data, error, isLoading } = useGetCharactersQuery(undefined)
  const dispatch = useAppDispatch()

  // TODO: create these components
  if (isLoading) return <div>Loading</div>
  if (error) return <div>Error</div>
  if (!data || isEmpty(data)) return <div>No data found</div>

  const { all, ...charactersBySpecies } = data

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
        <Tabs orientation='vertical' height='80vh' overflowY='scroll' variant='unstyled'>
          <TabList>
            {Object.keys(data).map((key) => (
              <Tab key={key} _selected={{ color: 'white', bg: 'black' }}>
                <Text casing='capitalize'>{key}</Text>
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            <AllSpecies characters={all} />
            {Object.keys(charactersBySpecies).map((key) => (
              <SpeciesItem key={key} name={key} characters={charactersBySpecies[key]} />
            ))}
          </TabPanels>
        </Tabs>
      </>
    </Layout>
  )
}

export default App
