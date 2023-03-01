import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { isEmpty } from 'lodash'

import Tabs from './components/UI/Tabs/Tabs'
import SpeciesItem from './components/SpeciesItem/SpeciesItem'
import Layout from './layouts/PageContainer'
import { useGetCharactersQuery } from './api/starWars-api'
import AllSpecies from './components/AllSpecies/AllSpecies'

function App() {
  const { data, error, isLoading } = useGetCharactersQuery(undefined)

  // TODO: create these components
  if (isLoading) return <div>Loading</div>
  if (error) return <div>Error</div>
  if (!data || isEmpty(data)) return <div>No data found</div>

  const { all, ...charactersBySpecies } = data

  return (
    <Layout>
      <Tabs tabKeys={Object.keys(data)}>
        <Routes>
          <Route path='all' element={<AllSpecies characters={all} />} />
          {Object.keys(charactersBySpecies).map((key) => (
            <Route
              key={key}
              path={key}
              element={<SpeciesItem key={key} name={key} characters={charactersBySpecies[key]} />}
            />
          ))}
          <Route path='*' element={<Navigate to='all' />} />
        </Routes>
      </Tabs>
    </Layout>
  )
}

export default App
