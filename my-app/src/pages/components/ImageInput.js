import React, { useState } from 'react';

function ImageInput({ onImageInput }) {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    // Call the onImageInput callback with true to indicate an image is inputted
    onImageInput(true);
    // Add image handling logic
  };

  return (
    <div className="flex justify-center my-20">
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
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageInput;
