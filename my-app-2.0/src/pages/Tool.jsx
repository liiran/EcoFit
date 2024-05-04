import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import "../index.css"

import ImageInput from './components/ImageInput'
import DisplayClothes from './components/DisplayClothes'


const Tool = () => {
    const [isImageInputted, setIsImageInputted] = useState(false)

    // Check if image is inputted
    const handleImageInput = () => {
        setIsImageInputted(true);
        console.log("Image is Inputted")
    };

    
    return (
        <>
          
        <div className='Tool'>
            <div style={{ height: '50px'}}></div>
            <ImageInput onImageInput={handleImageInput} />
            <DisplayClothes />
        </div>

        </>
      );
}

export default Tool;