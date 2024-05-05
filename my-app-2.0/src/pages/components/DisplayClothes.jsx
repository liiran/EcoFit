// rfce (for extension ES7 React)
import React from 'react';
import { Link } from 'react-router-dom';

function DisplayClothes({responseData}) {
  console.log(responseData)
  const clothes = responseData.map(item => {
    // Convert base64 to URL
    const imageURL = `data:image/png;base64,${item.image_data}`; // Will not work for avif format
    return imageURL;
  });

  const companyNames = responseData.map(item => item.company_name);
  const itemLinks = responseData.map(item => item.image_link);

  const badges = [
    './badges/bcorp.png',
    './badges/criteria.png',
    './badges/fairtrade.png',
    './badges/fsc.png',
    './badges/gots.png',
    './badges/natural.png',
    './badges/oeko.png',
    './badges/package.png',
    './badges/recycle.png'
  ];
  

  return (
    <div className="p-4">
      <div className="grid grid-cols-4 gap-4 justify-items-center">
        {clothes.map((cloth, index) => (
          <div key={index} style={{width:'300px', height:'600px'}} 
          <Link to={itemLinks[index]} key={index} className="w-full">
            className="bg-white rounded-lg flex flex-col text-center hover:border hover:rounded-none transition-all">
            <img src={cloth} alt={`Cloth ${index}`} 
              className="object-contain rounded-t-lg hover:rounded-none transition-all"
              style={{ maxWidth: '300px', maxHeight: '300px' }}/>
            <p className="mt-5 mb-1 font-bold text-xl"> {companyNames[index]} </p>
            <p className="text-sm mb-3"> $99.99 </p>
            <hr className="h-px w-3/4 self-center bg-gray-200 border-0 dark:bg-gray-300 mb-3"></hr>
            <div className="grid grid-cols-3 gap-y-6 mt-2 justify-items-center">
              {badges.map((badge, badgeIndex) => (
                <Link to="/Criteria" key={badgeIndex}>
                  <img
                    src={badge}
                    alt={`Badge ${badgeIndex}`}
                    className="rounded-lg hover:scale-125"
                    style={{ maxWidth: '40px', maxHeight: '40px'}}
                  />
                </Link>
              ))}
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayClothes;
