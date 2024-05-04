import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import "../index.css"

import ImageInput from './components/ImageInput'
import Animation from './components/Animation'
import DisplayClothes from './components/DisplayClothes'
import NavBar from './components/NavBar'

const Home = () => {
    const [isImageInputted, setIsImageInputted] = useState(false)
    const [showTool, setShowTool] = useState(false)
    const location = useLocation();
    const isRoot = location.pathname === '/';

    // Check if image is inputted
    const handleImageInput = () => {
        setIsImageInputted(true);
        console.log("Image is Inputted")
    };

    useEffect(() => {
        // Set a timer to change showTool state after 3 seconds
        const timer = setTimeout(() => {
            setShowTool(true);
        }, 3000);  


        return () => clearTimeout(timer);
    }, [])

    return (
      <>
        
        {isRoot && < Animation />}
        <NavBar />

      </>
    );
};

export default Home;
