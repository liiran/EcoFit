import React from 'react';

function NavBar() {
  return (
    <nav style={{ backgroundColor: '#abbd95' }} className="p-4">
      <div className="container flex items-center">
        <div className="text-white font-bold"> EcoFit </div>
        <ul className="flex space-x-5 ml-auto">
          <li>
            <a href="Home" className="text-white hover:text-gray-300">Home</a>
          </li>
          <li>
            <a href="Another" className="text-white hover:text-gray-300">Another</a>
          </li>
          <li>
            <a href="Badges" className="text-white hover:text-gray-300">Badges</a>
          </li>
          <li>
            <a href="AboutUs" className="text-white hover:text-gray-300">About Us</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
