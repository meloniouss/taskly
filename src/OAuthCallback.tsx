import { useEffect } from 'react';

const OAuthCallback = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('sessionToken', token); //unnecessary
        
      window.location.href = '/homepage'; 
    } else {
      console.error('No token found in URL');
    }
  }, []);

  return <div>Logging in...</div>;
};

export default OAuthCallback;
