import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import "../index.css"

import ImageInput from './components/ImageInput'
import Animation from './components/Animation'
import DisplayClothes from './components/DisplayClothes'

const Home = () => {
    const [isImageInputted, setIsImageInputted] = useState(false)
    const [showTool, setShowTool] = useState(false)

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
        <Animation />
        {showTool && (
          <div className='Tool'>
            <div style={{ height: '50px'}}></div>
          </div>
        )}
      </>
    );
};

export default Home;
