import React from 'react'
import { useAppDispatch } from './store/store'
import Body from './layout/Body'
import { updateFilter } from './store/starWarsApi-slice'

function App() {
  const dispatch = useAppDispatch()

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
    <div>
      <button onClick={handleClick}>click</button>
      <Body />
    </div>
  )
}

export default App
