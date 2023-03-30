import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { isEmpty } from 'lodash'

import Tabs from './components/UI/Tabs/Tabs'
import SpeciesItem from './components/SpeciesItem/SpeciesItem'
import Layout from './layouts/PageContainer'
import LoadingSpinner from './components/UI/LoadingSpinner/LoadingSpinner'
import AllSpecies from './components/AllSpecies/AllSpecies'
import Message, { MESSAGE_STATUS } from './components/UI/Message/Message'
import { useGetCharactersQuery } from './api/starWars-api'

function App() {
  const { data, error, isLoading } = useGetCharactersQuery(undefined)

  if (isLoading) return <LoadingSpinner />
  if (error)
    return (
      <Message
        status={MESSAGE_STATUS.ERROR}
        title='Fetch Error'
        message='Failed to fetch data. Please try it later!'
      />
    )
  if (!data || isEmpty(data))
    return <Message status={MESSAGE_STATUS.WARNING} title='No data found' />

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
