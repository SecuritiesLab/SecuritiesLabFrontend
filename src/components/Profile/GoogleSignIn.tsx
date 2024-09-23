import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axiosInstance from '../../api/axiosConfig';  // Import your axios instance
import { useNavigate } from 'react-router-dom';

export default function GoogleSignIn() {
  const navigate = useNavigate();
  const handleSuccess = (response: any) => {
    console.log("Google login success:", response);
    const token = response.credential; // Get the ID token from the response

    // Send the token to the backend using axiosInstance
    axiosInstance.post('/auth/google', { token })
      .then((res) => {
        console.log("Backend response:", res.data);
        // Store the JWT token in localStorage or handle login success
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
        }
        // Optionally, redirect to dashboard or other protected page
        navigate('/dashboard'); // Redirect to dashboard after successful login
      })
      .catch((error) => {
        console.error("Error sending token to backend:", error);
      });
  };

  const handleFailure = () => {
    console.log("Google login failed."); // No arguments here, just a general failure message
  };

  return (
    <GoogleOAuthProvider clientId="721137253542-lt9iuvnq2sja9fln4j8suuvc09sf79ju.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleFailure} 
        useOneTap
      />
    </GoogleOAuthProvider>
  );
}