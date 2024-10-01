import React, { useEffect, useState } from 'react';
import SumsubWebSdk from '@sumsub/websdk-react';
import { getAccessToken } from '../../api/sumSubApi'; // Import your API
import { getDecryptedData } from '../../authentication/EncryptAndDecryptData';

interface ApplicantStatusPayload {
  reviewResult?: {
    reviewAnswer: string;
  };
  // Add other properties of payload if necessary
}

const SumsubKycWidget: React.FC<{ onKycCompleted: () => void }> = ({ onKycCompleted }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await getAccessToken("SecuritiesLab", 'basic-kyc-level');
        setAccessToken(response.token);
        setIsLoading(false);
      } catch (error) {
        setError('Failed to fetch access token');
        setIsLoading(false);
      }
    };
    fetchAccessToken();
  }, []);

  if (isLoading) return <div>Loading Sumsub KYC Widget...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div id="KYC">
      <SumsubWebSdk
        testEnv={true}
        accessToken={accessToken as string}
        expirationHandler={() => Promise.resolve(accessToken as string)}
        config={{
          lang: 'en'
        }}
        options={{
          addViewportTag: false
        }}
        onMessage={(messageType, payload) => {
          console.log('Sumsub message:', messageType, payload);
        
          if (messageType === 'idCheck.onApplicantStatusChanged') {
            const typedPayload = payload as { reviewResult?: { reviewAnswer?: string } };
        
            if (typedPayload.reviewResult?.reviewAnswer === 'GREEN') {
              // KYC is completed successfully
              console.log('KYC completed successfully');
              onKycCompleted();
            }
          }
        }}
        onError={(error) => {
          console.error('Sumsub error:', error);
        }}
      />
    </div>
  );
};

export default SumsubKycWidget;