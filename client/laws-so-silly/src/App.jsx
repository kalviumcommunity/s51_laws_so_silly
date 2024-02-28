import { BrowserRouter as Router} from "react-router-dom"
import Allroutes from "./Allroutes"
import Navbar from "./components/Navbar"

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Allroutes />
      </Router>
    </>
  )
}

export default App