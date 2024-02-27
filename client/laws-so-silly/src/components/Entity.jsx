import "./entity.css"
const Entity = ({law}) => {
  return (
    <div className="entity">
          <h1>{law.Country}</h1>
          <p className="law">{law.Law}</p>
          <p className="penalty">{law.Penalty}</p>
          <p className="region">{law.State_Region_if_applicable}</p>
    </div>
  )
}

export default Entity