import { useEffect } from 'react';

const OAuthCallback = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token'); // Retrieve token from URL

    if (token) {
      // Store the token in localStorage
      localStorage.setItem('sessionToken', token);
        
      // Redirect to the dashboard or home page
      window.location.href = '/homepage'; // Or whatever page you want to go to
    } else {
      console.error('No token found in URL');
    }
  }, []);

  return <div>Logging in...</div>;
};

export default OAuthCallback;
