import React, { useEffect, useState } from 'react';
import SumsubWebSdk from '@sumsub/websdk-react'

const SumsubKyc: React.FC = () => {
  //const [accessToken, setAccessToken] = useState<string | null>(null);
  const accessToken = "_act-sbx-jwt-eyJhbGciOiJub25lIn0.eyJqdGkiOiJfYWN0LXNieC0xZWUwNTJlYy0xNTNiLTQ5YTMtOTc0Mi1mMTJlYjYzY2RhNDktdjIiLCJ1cmwiOiJodHRwczovL2FwaS5zdW1zdWIuY29tIn0.-v2";

  const baseUrl = 'https://api.sumsub.com/resources/accessTokens';
  const userId = "mohit"; // Generate a random userId
  const levelName = 'basic-kyc-level';
  const ttlInSecs = 600; // Token valid for 600 seconds

  const queryParams = new URLSearchParams({
    userId: userId,
    levelName: levelName,
    ttlInSecs: ttlInSecs.toString(),
  });

  const url = `${baseUrl}?${queryParams.toString()}`;

  const appToken = 'sbx:2uMwd4LGcvEFA2wNhnncLcSh.Stvcc7dN2vhDXyhLTxYbvgDDQrK8xtgE'; // Replace with your Sumsub app token
  const appSecret = 'your_app_secret_here'; // Replace with your Sumsub app secret

  // Function to handle token expiration
  const accessTokenExpirationHandler = (): Promise<string> => {
    // Fetch a new token from your backend
    return fetch('https://your-backend.com/sumsub/refresh-token')
      .then(response => response.json())
      .then(data => data.token)
      .catch(error => {
        console.error('Failed to refresh access token:', error);
        throw new Error('Token renewal failed');
      });
  };


  // Event handler for receiving messages from the Sumsub SDK
  const messageHandler = (messageType: string, payload: any) => {
    console.log('Sumsub message:', messageType, payload);
  };

  // Error handler for the Sumsub SDK
  const errorHandler = (error: any) => {
    console.error('Sumsub error:', error);
  };

  const config = {
    lang: 'en', // Language setting
    email: 'user-email@example.com', // User email (optional)
    phone: '1234567890', // User phone number (optional)
  };

  const options = {
    addViewportTag: false,
    adaptIframeHeight: true,
  };

  if (!accessToken) {
    return <div>Loading...</div>; // Show a loading state while fetching the token
  }

  return (
    <div id="KYC">
     <SumsubWebSdk
        testEnv={true}
        accessToken={accessToken}
        expirationHandler={() => Promise.resolve(accessToken)}
        config={{
          lang: "zh-tw"
          // email: "test@gmail.com",
          // phone: "0912234456"
        }}
        // options={{ addViewportTag: false, adaptIframeHeight: true }}
        onMessage={(data, payload) => console.log("onMessage", data, payload)}
        onError={(data) => console.log("onError", data)}
      />
    </div>
  );
};

export default SumsubKyc;