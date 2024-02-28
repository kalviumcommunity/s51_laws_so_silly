import "./entity.css"
import { Link } from "react-router-dom"

const Entity = ({ law }) => {
  return (
    <div className="entity">
      <h1>{law.Country}</h1>
      <p className="law">{law.Law}</p>
      <p className="penalty">{law.Penalty}</p>
      <p className="region">{law.State_Region_if_applicable}</p>
      <Link to="/update/:country"><button>
        - Update +
      </button></Link>
      <button>- Delete - </button>
    </div>
  )
}

export default Entity