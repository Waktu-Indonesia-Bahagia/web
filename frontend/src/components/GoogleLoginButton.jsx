// GoogleLoginButton.js
import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleLoginButton = ({ onGoogleLoginSuccess, onGoogleLoginFailure }) => {
  const clientId = "32777369847-5r0nmbdp0ne58uv6hhesfmd07dli4mqi.apps.googleusercontent.com"; // Ganti dengan ID klien Google Anda

  const responseGoogle = (response) => {
    if (response && response.profileObj) {
      onGoogleLoginSuccess(response.profileObj);
    } else {
      onGoogleLoginFailure(response);
    }
  };

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginButton;
