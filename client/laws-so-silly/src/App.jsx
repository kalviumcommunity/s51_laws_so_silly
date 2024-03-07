import { BrowserRouter as Router} from "react-router-dom"
import Allroutes from "./Allroutes"
import Navbar from "./components/Navbar"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Navbar />
        <Allroutes />
      </Router>
    </>
  )
}

export default App