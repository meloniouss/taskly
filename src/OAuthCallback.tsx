import { useEffect } from 'react';

const OAuthCallback = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      const cookieExpiration = new Date();
      cookieExpiration.setTime(cookieExpiration.getTime() + (24 * 60 * 60 * 1000)); // 1 day
      document.cookie = `sessionToken=${token}; path=/; expires=${cookieExpiration.toUTCString()};Secure;`;
      window.location.href = '/'; 
    } else {
      console.error('No token found in URL');
    }
  }, []);

  return <div>Logging in...</div>;
};

export default OAuthCallback;
