import React, { useEffect, useState } from 'react';
import SumsubWebSdk from '@sumsub/websdk-react';

const SumsubKycWidget: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state to show until token is fetched
  const [error, setError] = useState<string | null>(null);

  // Fetch access token from your backend when component mounts
  useEffect(() => {
    console.log("kyc widget")
    const fetchAccessToken = async () => {
      const baseUrl = 'https://api.sumsub.com/resources/accessTokens';
      const userId = "mohit"; 
      const levelName = 'basic-kyc-level';
      const ttlInSecs = 600; 

      const queryParams = new URLSearchParams({
        userId: userId,
        levelName: levelName,
        ttlInSecs: ttlInSecs.toString(),
      });

      const url = `${baseUrl}?${queryParams.toString()}`;

      const appToken = 'sbx:2uMwd4LGcvEFA2wNhnncLcSh.Stvcc7dN2vhDXyhLTxYbvgDDQrK8xtgE'; // Your app token
      const appSecret = 'bYtHygxHYABgc46Af6qUrYVzEAsAn2r8'; // Your app secret

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'X-App-Token': appToken,
            'Authorization': `Basic ${btoa(`${appToken}:${appSecret}`)}`, // Basic Auth
          },
        });

        console.log("response")
        console.log(response)

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setAccessToken(data.token); // Set the access token
        setIsLoading(false); // Token is fetched, stop loading
      } catch (error) {
        setError('Failed to fetch access token');
        setIsLoading(false); // Stop loading in case of error
      }
    };
    fetchAccessToken();
  }, []);

  // Token expiration handler to refresh token
  const accessTokenExpirationHandler = (): Promise<string> => {
    return fetch('https://your-backend.com/sumsub/refresh-token')
      .then(response => response.json())
      .then(data => data.token)
      .catch(error => {
        console.error('Failed to refresh access token:', error);
        throw new Error('Token renewal failed');
      });
  };

  // Render loading or error states if applicable
  if (isLoading) return <div>Loading Sumsub KYC Widget...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div id="KYC">
      <SumsubWebSdk
        testEnv={true}
        accessToken={accessToken as string} // Ensure accessToken is not null
        expirationHandler={accessTokenExpirationHandler}
        config={{
          lang: 'en',
          email: 'user-email@example.com', // Optional
          phone: '1234567890', // Optional
        }}
        options={{
          addViewportTag: false,
          adaptIframeHeight: true,
        }}
        onMessage={(messageType, payload) => {
          console.log('Sumsub message:', messageType, payload);
        }}
        onError={(error) => {
          console.error('Sumsub error:', error);
        }}
      />
    </div>
  );
};

export default SumsubKycWidget;