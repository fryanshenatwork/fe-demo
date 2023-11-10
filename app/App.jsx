import React from 'react'
import RoomAllocation from './components/RoomAllocation/index.jsx'

export default () => {
  return (
    <RoomAllocation
      guest={10}
      room={3}
      onChange={result => console.log(result)}
    />
  )
}