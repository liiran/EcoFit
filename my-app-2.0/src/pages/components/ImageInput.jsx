import React, { useState, useRef } from 'react';

function ImageInput({ onImageInput }) {
  const [image, setImage] = useState(null);
  const [uploadOption, setUploadOption] = useState('pc'); // Set initial state to 'pc'  
  const videoRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    // Call the onImageInput callback with true to indicate an image is inputted
    onImageInput(true);
  };

  const handleUploadOptionChange = (option) => {
    setUploadOption(option);
    if (option === 'pc') {
      // Trigger the file input
      document.getElementById('imageInput').click();
    } else if (option === 'camera') {
      // Start camera
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoRef.current.srcObject = stream;
        })
        .catch(err => console.error('Error accessing camera:', err));
    }
  };

  return (
    <div className="relative flex justify-center my-20 ">
      {/* Upload Options */}
      <div className="left-0 flex flex-col gap-2 p-4 bg-gray rounded-tl-lg">
        <button
          className={`bg-gray-200 p-2 rounded-full ${uploadOption === 'pc' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
          onClick={() => handleUploadOptionChange('pc')}
        >
          <img src="./src/assets/FiUpload.webp" className="max-w-6 max-h-6"></img>
        </button>
        <button
          className={`bg-gray-200 p-2 rounded-full ${uploadOption === 'camera' ? 'bg-blue-500' : 'text-gray-600'}`}
          onClick={() => handleUploadOptionChange('camera')}
        >
          <img src="./src/assets/FiCamera.png" className="max-w-6 max-h-6"></img>
        </button>
      </div>
      {/* Image Display */}
      <div className="w-96 h-72 border border-gray-500 bg-gray-200 rounded-lg overflow-hidden flex justify-center">
        {image ? (
          <img src={image} alt="Selected" style={{ maxWidth: '350px', maxHeight: '350px' }} className="object-contain"/>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <label
              htmlFor="imageInput"
              className="cursor-pointer text-gray-400 hover:text-gray-600"
            >
              Click to upload image
            </label>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={handleImageChange}
            />
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ display: uploadOption === 'camera' ? 'block' : 'none' }}
              autoPlay
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageInput;
