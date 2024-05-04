import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Criteria from './pages/Criteria'
import Tool from './pages/Tool'



export default function App() {
    return (
      <div> 
        <BrowserRouter>
          <Routes>
            <Route index element = {<Home />} />
            <Route path= "/home" element={<Home />} />
            <Route path= "/criteria" element={<Criteria />} />
            <Route path = "/tool" element={<Tool />} />
          </Routes>
        </BrowserRouter>

      </div>
    )
}