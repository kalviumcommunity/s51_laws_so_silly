import React from 'react'
import Forms from './LawForm'
import { useParams } from 'react-router-dom'

const UpdateEntity = () => {
  let {country} = useParams()
  return (
    <>
      <Forms create={false} Country={country} />
    </>
  )
}

export default UpdateEntity