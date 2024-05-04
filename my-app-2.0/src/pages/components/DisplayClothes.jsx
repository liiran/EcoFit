// rfce (for extension ES7 React)
import React from 'react';

function DisplayClothes() {
  const clothes = [
    'https://dummyimage.com/300x300/000/fff',
    'https://dummyimage.com/300x300/333/fff',
    'https://dummyimage.com/300x300/666/fff',
    'https://dummyimage.com/300x300/000/fff',
    'https://dummyimage.com/300x300/333/fff',
    'https://dummyimage.com/300x300/666/fff',
    'https://i.etsystatic.com/22819560/r/il/a5f6b8/3963743381/il_570xN.3963743381_ak2s.jpg',
    'https://www.rei.com/media/a306fcac-92ef-4ef3-9f61-a33654f08ec9.jpg?size=576x768'
  ];

  return (
    <div style={{ backgroundColor: '#abbd95' }} className="p-4">
        <div className="grid grid-cols-4 gap-4 justify-items-center">
            {clothes.map((cloth, index) => (
            <div style={{width:'300px', height:'300px'}} className="bg-white rounded-lg flex justify-center">
                <img key={index} src={cloth} alt={`Cloth ${index}`} className="object-contain rounded-lg hover:rounded-none"
                style={{ maxWidth: '300px', maxHeight: '300px' }}/>
            </div>
            ))}
        </div>
    </div>
  );
}

export default DisplayClothes;

