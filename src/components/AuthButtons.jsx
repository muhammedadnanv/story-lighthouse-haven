import React from 'react';
import { Button } from "@/components/ui/button";
import { FaGoogle, FaFacebook } from 'react-icons/fa';

const AuthButtons = () => {
  const handleGoogleAuth = () => {
    // Implement Google authentication logic here
    console.log('Google auth clicked');
  };

  const handleFacebookAuth = () => {
    // Implement Facebook authentication logic here
    console.log('Facebook auth clicked');
  };

  return (
    <div className="flex space-x-4">
      <Button onClick={handleGoogleAuth} className="flex items-center">
        <FaGoogle className="mr-2" /> Login with Google
      </Button>
      <Button onClick={handleFacebookAuth} className="flex items-center">
        <FaFacebook className="mr-2" /> Login with Facebook
      </Button>
    </div>
  );
};

export default AuthButtons;