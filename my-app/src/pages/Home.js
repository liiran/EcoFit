import React, { useState } from 'react';
import NavBar from './components/NavBar';
import ImageInput from './components/ImageInput';
import DisplayClothes from './components/DisplayClothes';
import Animation from './components/Animation';

export function Home() {
    const [isImageInputted, setIsImageInputted] = useState(false);

    // Check if image is inputted
    const handleImageInput = () => {
        setIsImageInputted(true);
    };

    return (
      <div className="bg-white h-screen">
        <Animation/>
        <NavBar/>
        <ImageInput onImageInput={handleImageInput}/>
        {isImageInputted && <DisplayClothes/>}
      </div>
    );
}

export default Home;
