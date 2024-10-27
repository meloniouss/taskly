// HomePage.tsx
import React from 'react';
import Topbar from './Topbar'; // Adjust the path as necessary
import Cookies from 'js-cookie';

// After login
const sessionToken = Cookies.get('sessionToken');
console.log('Session Token:', sessionToken);


const HomePage: React.FC = () => {
  console.log('Session Token:', Cookies.get('sessionToken'));
  return (
    <div>
      <h1>YOU ARE CURRENTLY LOGGED IN</h1>
      {/* Other content for your home page */}
    </div>
  );
};

export default HomePage;
