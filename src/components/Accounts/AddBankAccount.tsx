// AddBankAccount.tsx

import React, { useState, useEffect } from 'react';
import { Box, Dialog, DialogTitle, DialogContent, TextField, MenuItem, Button, CircularProgress } from '@mui/material';
import { getAccessToken, getBanks, createEndUserAgreement, createRequisition, redirectToBankAuth } from '../../api/gocardlessApi';

interface AddBankAccountProps {
  open: boolean;
  onClose: () => void;
}

const AddBankAccount: React.FC<AddBankAccountProps> = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [banks, setBanks] = useState<any[]>([]);
  const [countries, setCountries] = useState<{ code: string; name: string }[]>([]);
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  useEffect(() => {
    if (open) {
      fetchCountries();
    }
  }, [open]);

  // Fetch country codes from JSON file
// AddBankAccount.tsx

const fetchCountries = async () => {
    try {
      const response = await fetch('/countries/countries.json'); // Assuming countries.json is in the public folder
      const data: { [key: string]: string } = await response.json(); // Explicitly type data as an object with string keys and values
      const formattedCountries = Object.entries(data).map(([code, name]) => ({ code, name })); // Now name is correctly inferred as string
      setCountries(formattedCountries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };
  const handleFetchBanks = async (countryCode: string) => {
    try {
      setLoading(true);
      const accessToken = await getAccessToken();
      const banks = await getBanks(accessToken, countryCode);
      setBanks(banks);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching banks:", error);
    }
  };

  const handleBankSelection = async () => {
    if (!selectedBank) return;

    try {
      const accessToken = await getAccessToken();
    console.log("access token done")
      const agreement = await createEndUserAgreement(accessToken, selectedBank);
      console.log("agreement done")
      const redirectLink = await createRequisition(accessToken, selectedBank, agreement.id);
      console.log("requisition done")
      console.log(redirectLink)
      redirectToBankAuth(redirectLink);
    } catch (error) {
      console.error("Error during bank authentication flow:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Select Your Bank</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box sx={{ width: 400 }}>
            {/* Country selection */}
            <TextField
              select
              fullWidth
              label="Select Country"
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                handleFetchBanks(e.target.value);
              }}
              sx={{ marginBottom: 2 }}
            >
              {countries.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {country.name}
                </MenuItem>
              ))}
            </TextField>

            {/* Bank selection */}
            {selectedCountry && (
              <TextField
                select
                fullWidth
                label="Choose a bank"
                value={selectedBank || ""}
                onChange={(e) => setSelectedBank(e.target.value)}
                sx={{
                  marginBottom: 2,
                  fontSize: "1.2rem",
                  "& .MuiOutlinedInput-root": { fontSize: "1.2rem" },
                }}
              >
                {banks.map((bank: any) => (
                  <MenuItem key={bank.id} value={bank.id} sx={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={bank.logo}
                      alt={bank.name}
                      style={{ width: "40px", height: "40px", marginRight: "10px" }}
                    />
                    {bank.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
            <Button variant="contained" fullWidth onClick={handleBankSelection}>
              Confirm Selection
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddBankAccount;