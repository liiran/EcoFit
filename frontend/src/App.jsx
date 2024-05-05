import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Criteria from './pages/Criteria'
import Tool from './pages/Tool'
import About from './pages/about'



export default function App() {
    return (
      <div> 
        <BrowserRouter>
          <Routes>
            <Route index element = {<Home />} />
            <Route path= "/home" element={<Home />} />
            <Route path= "/criteria" element={<Criteria />} />
            <Route path = "/tool" element={<Tool />} />
            <Route path = "/about-us" element={<About />} />
          </Routes>
        </BrowserRouter>

      </div>
    )
}