import { useEffect } from 'react';

const OAuthCallback = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log(token);
    
    if (token) {
      const cookieExpiration = new Date();
      cookieExpiration.setTime(cookieExpiration.getTime() + (24 * 60 * 60 * 1000)); // 1 day
      console.log(cookieExpiration);
      document.cookie = `sessionToken=${token}; path=/; expires=${cookieExpiration.toUTCString()};`;
      window.location.href = '/otherpage'; 
    } else {
      console.error('No token found in URL');
    }
  }, []);

  return <div>Logging in...</div>;
};

export default OAuthCallback;
