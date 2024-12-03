import React, { useEffect, useState } from 'react';
import { getAccessToken, getAccountDetails, getAccountTransactions, listAccounts } from '../../api/gocardlessApi';

const RedirectPage = () => {
  const [accountDetails, setAccountDetails] = useState<any>(null);
  const [transactions, setTransactions] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accessToken = await getAccessToken();
        const requisitionId = "d98f77d1-1138-44a4-ba46-4faf498ce6bd";

        if (requisitionId) {
          const accounts = await listAccounts(accessToken, requisitionId);

          console.log("listAccounts")
          console.log(accounts)

          console.log(accounts?.length > 0)
          // Assuming we fetch the first account's details and transactions
          if (accounts?.length > 0) {
            console.log("account")
            const accountId = accounts[0];

            console.log(accountId)

            //const details = await fetchAccountDetails(accessToken, accountId);
            //console.log("details")
            //console.log(details)
            //setAccountDetails(details);

            const transactionsData = await fetchTransactions(accessToken, accountId);
            setTransactions(transactionsData);
          }
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const fetchTransactions = async (accessToken: string, accountId: string) => {
    const transactions = await getAccountTransactions(accessToken, accountId);
    return transactions;
  };

  const fetchAccountDetails = async (accessToken: string, accountId: string) => {
    const details = await getAccountDetails(accessToken, accountId);
    return details;
  };

  if (isLoading) {
    return <div>Loading your bank accounts...</div>;
  }

  return (
    <div>
      <h2>Account Details</h2>
      {accountDetails ? (
        <div>
          <p><strong>Resource ID:</strong> {accountDetails.account.resourceId}</p>
          <p><strong>IBAN:</strong> {accountDetails.account.iban}</p>
          <p><strong>Currency:</strong> {accountDetails.account.currency}</p>
          <p><strong>Owner Name:</strong> {accountDetails.account.ownerName}</p>
          <p><strong>Name:</strong> {accountDetails.account.name}</p>
          <p><strong>Product:</strong> {accountDetails.account.product}</p>
          <p><strong>Cash Account Type:</strong> {accountDetails.account.cashAccountType}</p>
        </div>
      ) : (
        <p>No account details available.</p>
      )}

      <h2>Transactions</h2>
      {transactions ? (
        <div>
          <h3>Booked Transactions</h3>
          {transactions.transactions.booked.length > 0 ? (
            transactions.transactions.booked.map((txn: any) => (
              <div key={txn.transactionId} style={{ marginBottom: '16px', borderBottom: '1px solid #ccc', paddingBottom: '8px' }}>
                <p><strong>Transaction ID:</strong> {txn.transactionId}</p>
                <p><strong>Debtor Name:</strong> {txn.debtorName || 'N/A'}</p>
                <p><strong>IBAN:</strong> {txn.debtorAccount?.iban || 'N/A'}</p>
                <p><strong>Amount:</strong> {txn.transactionAmount.amount} {txn.transactionAmount.currency}</p>
                <p><strong>Bank Transaction Code:</strong> {txn.bankTransactionCode}</p>
                <p><strong>Booking Date:</strong> {txn.bookingDate}</p>
                <p><strong>Value Date:</strong> {txn.valueDate}</p>
                <p><strong>Remittance Information:</strong> {txn.remittanceInformationUnstructured}</p>
              </div>
            ))
          ) : (
            <p>No booked transactions available.</p>
          )}

          <h3>Pending Transactions</h3>
          {transactions.transactions.pending.length > 0 ? (
            transactions.transactions.pending.map((txn: any, index: number) => (
              <div key={index} style={{ marginBottom: '16px', borderBottom: '1px solid #ccc', paddingBottom: '8px' }}>
                <p><strong>Amount:</strong> {txn.transactionAmount.amount} {txn.transactionAmount.currency}</p>
                <p><strong>Value Date:</strong> {txn.valueDate}</p>
                <p><strong>Remittance Information:</strong> {txn.remittanceInformationUnstructured}</p>
              </div>
            ))
          ) : (
            <p>No pending transactions available.</p>
          )}
        </div>
      ) : (
        <p>No transactions available.</p>
      )}
    </div>
  );
};

export default RedirectPage;