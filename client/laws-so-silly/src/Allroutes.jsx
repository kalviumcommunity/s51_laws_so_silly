import {Routes, Route} from "react-router-dom"
import UpdateEntity from './components/UpdateEntity'
import CreateEntity from './components/CreateEntity'
import Entities from "./components/Entities"

const Allroutes = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<Entities />}/>
            <Route path='/update/:country' element={<UpdateEntity />}/>
            <Route path='/create' element={<CreateEntity />}/>
        </Routes>
    </>
  )
}

export default Allroutes