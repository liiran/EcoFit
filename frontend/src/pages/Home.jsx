import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import "../index.css"

import ImageInput from './components/ImageInput'
import Animation from './components/Animation'
import DisplayClothes from './components/DisplayClothes'
import NavBar from './components/NavBar'
import Content from './components/Content';

const Home = () => {
    const [isImageInputted, setIsImageInputted] = useState(false)
    const location = useLocation();
    const isRoot = location.pathname === '/'

    const [showContent, setShowContent] = useState(false);


    useEffect(() => {
        // Set a timer to change showTool state after 3 seconds
        const timer = setTimeout(() => {
            setShowContent(true)
          
        }, 3000);  


        return () => clearTimeout(timer);
    }, [])

    return (
      <>
        
        {isRoot && (
        <>
          <Animation />
          {showContent && <NavBar />}
          {showContent && <Content />}
        </>
        )}

        {!isRoot && (
          <>
            <NavBar  />
            <Content />
          </>
        )}

      </>
    );
};

export default Home;
