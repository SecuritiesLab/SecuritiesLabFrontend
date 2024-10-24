import axiosInstance from './axiosConfig'; // Import your configured Axios instance

// Call backend to get access token
export async function getAccessToken() {
  const response = await axiosInstance.post('/gocardless/getAccessToken');
  return response.data.access;
}

// Call backend to get available banks
export async function getBanks(accessToken: string) {
    console.log(accessToken)
  const response = await axiosInstance.get(`/gocardless/getBanks?accessToken=${accessToken}`
  );
  return response.data;
}

// Call backend to create end-user agreement
export async function createEndUserAgreement(accessToken: string, institutionId: string) {
  const response = await axiosInstance.post(`/gocardless/createAgreement?accessToken=${accessToken}`, {
    institution_id: institutionId,
    max_historical_days: 180,
    access_valid_for_days: 30,
    access_scope: ['balances', 'details', 'transactions']
  });
  return response.data;
}

const generateUniqueReference = () => {
    const randomPart = Math.random().toString(36).substring(2, 8); // Random alphanumeric string
    const timestampPart = Date.now().toString(36); // Convert current time to base36 for uniqueness
    return `ref_${timestampPart}_${randomPart}`; // Combine timestamp and random string
  };

// Call backend to create requisition
export async function createRequisition(accessToken: string, institutionId: string, agreementId: string) {
  const response = await axiosInstance.post(`/gocardless/createRequisition?accessToken=${accessToken}`, {
    redirect: 'https://securitieslab.eu/accounts',
    institution_id: institutionId,
    reference: generateUniqueReference(),
    agreement: agreementId,
    user_language: 'EN'
  });
  return response.data.link; // Return the redirect link
}

// Call backend to list accounts
export async function listAccounts(accessToken: string, requisitionId: string) {
  const response = await axiosInstance.get(`/gocardless/listAccounts/${requisitionId}?accessToken=${accessToken}`, 
   );
  return response.data.accounts;
}

// Call backend to get transactions for a specific account
export async function getAccountTransactions(accessToken: string, accountId: string) {
  const response = await axiosInstance.get(`/gocardless/getTransactions/${accountId}?accessToken=${accessToken}`, );
  return response.data.transactions;
}

// Function to redirect user to authenticate with their bank
export function redirectToBankAuth(url: string) {
    window.location.href = url; // Redirect the user to the bank authentication page
  }