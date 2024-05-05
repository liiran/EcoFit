import { useEffect, useState } from 'react'
import "../index.css"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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
        <div>
            <ImageInput onImageInput={handleImageInput}/>
            <h1> {isImageInputted && <DisplayClothes/>} </h1>
        </div>
        </>
      );
}

export default Tool;