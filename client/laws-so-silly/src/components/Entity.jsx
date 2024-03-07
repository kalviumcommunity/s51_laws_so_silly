import axios from "axios";
import "./entity.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";

const Entity = ({ law, setReload }) => {
  const navigate = useNavigate();
  const [isAuthorized, setisAuthorized] = useState(false);
  const URL = "https://laws-so-silly.onrender.com/api/";
  const [cookies, setCookies] = useState(null);

  useEffect(() => {
    const getCookies = () => {
      const cookieObj = document.cookie.split("; ").reduce((acc, cookie) => {
        const [name, value] = cookie.split("=");
        acc[name] = value;
        return acc;
      }, {});
      return cookieObj;
    };

    const cookieObj = getCookies();
    setCookies(cookieObj);
  }, []);

  useEffect(() => {
    if (cookies && cookies.authToken) {
      let auth = authorize();
      setisAuthorized(auth);
    }
  }, [cookies]);

  const deleteDocument = async () => {
    try {
      const res = await axios.delete(`${URL}deleteData/${law.Country}`);
      console.log("Deleted Document", law.Country);
      toast.success("Deletion successful");
      setReload(prev => !prev);
    } catch (err) {
      console.error("Error: while deleting", err.message);
      toast.error("Error: while deleting");
    }
  };

  const authorize = () => {
    const authToken = cookies.authToken;
    if (authToken) {
      return true;
    } else {
      return false;
    }
  };

  const checkUpdate = () => {
    if (isAuthorized) {
      return navigate(`/update/${law.Country}`);
    } else {
      toast.error("You are not Authorised to update the Law");
    }
  };

  return (
    <div className="entity">
      <h1>{law.Country}</h1>
      <p className="law">{law.Law}</p>
      <p className="penalty">{law.Penalty}</p>
      <p className="region">{law.State_Region_if_applicable}</p>
      <p className="continent">{law.Continent}</p>
      <button onClick={checkUpdate}>- Update +</button>
      <button onClick={() => isAuthorized ? deleteDocument() : toast.error("You are not an authorized user.")}>- Delete -</button>
    </div>
  );
};

export default Entity;
