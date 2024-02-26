import React from 'react'
import data from "../data/data.json"

const Entities = () => {
  return (
    <div>
          <h1>{data.Country}</h1>
          <p>{data.Law}</p>
          <p>{data.Penalty}</p>
          <p>{data.State_Region_if_applicable}</p>
    </div>  
  )
}

export default Entities