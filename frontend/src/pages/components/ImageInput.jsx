import React, { useState, useRef, useEffect } from 'react';
import DisplayClothes from './DisplayClothes';

function ImageInput() {
  const [image, setImage] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [uploadOption, setUploadOption] = useState('pc');
  const [showCaptureButton, setShowCaptureButton] = useState(false); // State to track whether to show the Capture button
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const inputRef = useRef(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;  // Exit if no file is selected
    const reader = new FileReader();

    reader.onload = async () => {
      const base64Image = reader.result;
      setImage(base64Image);
      sendImageToBackend(base64Image);
    };

    reader.readAsDataURL(file);
    e.target.value = null;  // Reset file input for next use
  };

  const sendImageToBackend = async (base64Image) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get_sustainable_alternatives', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ base64image: base64Image }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setResponseData(responseData);
      } else {
        console.error('Error sending image to backend');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUploadOptionChange = (option) => {
    setImage(null);  // Clear previous image
    setUploadOption(option);
    if (option === 'pc') {
      setShowCaptureButton(false); // Hide Capture button when switching to PC upload
      inputRef.current.click();
    } else if (option === 'camera') {
      setShowCaptureButton(true); // Show Capture button when switching to camera upload
      if (videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoRef.current.srcObject = stream;
          videoRef.current.style.display = 'block';
        })
        .catch(err => console.error('Error accessing camera:', err));
    }
  };

  const handleCapture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageDataUrl = canvas.toDataURL('image/png');
      setImage(imageDataUrl);
      sendImageToBackend(imageDataUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [uploadOption]);

  return (
    <div>
      <div className="relative flex justify-center my-20">
        <div className="left-0 flex flex-col gap-2 p-4 bg-gray rounded-tl-lg">
          <button className={`bg-gray-200 p-2 rounded-full self-center 
          ${uploadOption === 'pc' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
            onClick={() => handleUploadOptionChange('pc')}>
            <img src="./src/assets/FiUpload.webp" className="max-w-6 max-h-6"></img>
          </button>
          <button className={`bg-gray-200 p-2 rounded-full self-center
          ${uploadOption === 'camera' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
            onClick={() => handleUploadOptionChange('camera')}>
            <img src="./src/assets/FiCamera.png" className="max-w-6 max-h-6"></img>
          </button>
          {/* Show Capture button only if camera option is selected */}
          {uploadOption === 'camera' && (
            <button className="bg-blue-500 text-white p-2 rounded-full"
              onClick={handleCapture} disabled={!videoRef.current}>
              Capture
            </button>
          )}
        </div>
        <div className="w-96 h-72 border border-gray-500 bg-gray-200 rounded-lg overflow-hidden flex justify-center">
          {image ? (
            <img src={image} alt="Selected" style={{ maxWidth: '350px', maxHeight: '350px' }} className="object-contain"/>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <label htmlFor="imageInput" className="cursor-pointer text-gray-400 hover:text-gray-600">
                Click to upload image
              </label>
              <input ref={inputRef} id="imageInput" type="file" accept="image/*" className="sr-only" onChange={handleImageChange} />
              <video ref={videoRef} className="absolute inset-0 w-half h-full object-cover" style={{ display: 'none', left:"40.35%" }} autoPlay />
            </div>
          )}
        </div>
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} width="960" height="720"></canvas>
      {responseData && <DisplayClothes responseData={responseData} />}
    </div>
  );
}

export default ImageInput;
