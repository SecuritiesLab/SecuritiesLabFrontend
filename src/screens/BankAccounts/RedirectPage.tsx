import React, { useEffect } from 'react';
import { getAccessToken, listAccounts } from '../../api/gocardlessApi';

const RedirectPage = () => {
  useEffect(() => {
    const fetchAccounts = async () => {
      const accessToken = await getAccessToken();
      const requisitionId = new URLSearchParams(window.location.search).get('requisition_id'); // Get requisition ID from URL
      if (requisitionId) {
        const accounts = await listAccounts(accessToken, requisitionId);
        console.log('Fetched accounts:', accounts);
        // You can save the accounts and redirect the user to the main page
      }
    };
    fetchAccounts();
  }, []);

  return <div>Loading your bank accounts...</div>;
};

export default RedirectPage;