import { useEffect, useState } from 'react'
import "../index.css"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import NavBar from './components/NavBar'
import ImageInput from './components/ImageInput'


const Tool = () => {
    const [isImageInputted, setIsImageInputted] = useState(false)

    // Check if image is inputted
    const handleImageInput = () => {
        setIsImageInputted(true);
        console.log("Image is Inputted")
    };

    
    return (
        <div className="pb-8">
            <NavBar />
            <ImageInput onImageInput={handleImageInput}/>
        </div>
      );
}

export default Tool;