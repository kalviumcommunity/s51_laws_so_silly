import axios from "axios"
import "./entity.css"
import { Link } from "react-router-dom"
import {  toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const Entity = ({ law, setReload }) => {
  const URL = "https://laws-so-silly.onrender.com/api/"

  const deleteDocument = async () => {
    try {
      const res = await axios.delete(`${URL}deleteData/${law.Country}`);
      console.log("Deleted Document", law.Country);
      toast.success("Deletion successful")
      setReload(prev => !prev);
    } catch (err) {
      console.error("Error: while deleting", err.message);
      toast.error("Error: while deleting");
    }
  };


  return (
    <div className="entity">
      <h1>{law.Country}</h1>
      <p className="law">{law.Law}</p>
      <p className="penalty">{law.Penalty}</p>
      <p className="region">{law.State_Region_if_applicable}</p>
      <Link to={`/update/${law.Country}`}><button>
        - Update +
      </button></Link>
      <button
        onClick={deleteDocument}
      >- Delete - </button>
    </div>
  )
}

export default Entity