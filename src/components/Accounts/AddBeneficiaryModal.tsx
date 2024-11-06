import React, { useState,useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Box, Tabs, Tab, TextField, Button, InputAdornment, MenuItem } from '@mui/material';

// Define prop types for the component
interface AddBeneficiaryModalProps {
  open: boolean;
  onClose: () => void;
}

const AddBeneficiaryModal: React.FC<AddBeneficiaryModalProps> = ({ open, onClose }) => {
  const [tabValue, setTabValue] = useState(0); // Track tab (Individual/Business)
  const [country, setCountry] = useState('Germany');
  const [currency, setCurrency] = useState('EUR');
  const [iban, setIban] = useState('');
  const [ibanError, setIbanError] = useState(false); // Track IBAN error state
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [countries, setCountries] = useState<{ code: string; name: string }[]>([]);
  
  useEffect(() => {
    if (open) {
      fetchCountries();
    }
  }, [open]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => setTabValue(newValue);

  // IBAN validation function
  const validateIban = (iban: string) => {
    const ibanPattern = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/; // Adjust as needed for specific IBAN rules
    return ibanPattern.test(iban);
  };

  const handleIbanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIban(value);
    setIbanError(!validateIban(value)); // Update error state based on validation
  };


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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Account Details</DialogTitle>
      <DialogContent>
        {/* Tabs for Individual/Business */}
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Individual" />
          <Tab label="Business" />
        </Tabs>

        <Box mt={2}>
          {/* Country */}
          <TextField
            select
            fullWidth
            label="Country / region of recipient's account"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            margin="normal"
          >
   {countries.map((country) => (
                <MenuItem key={country.code} value={country.code}>
                  {country.name}
                </MenuItem>
              ))}
            {/* Add other countries here */}
          </TextField>

          {/* Currency */}
          <TextField
            select
            fullWidth
            label="Currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            margin="normal"
          >
            <MenuItem value="EUR">Euro (EUR)</MenuItem>
            <MenuItem value="USD">US Dollar (USD)</MenuItem>
            {/* Add other currencies here */}
          </TextField>

          {/* IBAN Field */}
          <TextField
            fullWidth
            label="IBAN"
            value={iban}
            onChange={handleIbanChange}
            margin="normal"
            error={ibanError}
            helperText={ibanError ? "Incorrect IBAN format for the selected country/region" : ""}
          />

          {/* Conditional Fields Based on Tab Selection */}
          {tabValue === 0 ? (
            // Individual Beneficiary Fields
            <>
              <TextField
                fullWidth
                label="First and middle names"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Last name(s)"
                margin="normal"
              />
            </>
          ) : (
            // Business Beneficiary Fields
            <>
              <TextField
                fullWidth
                label="Company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                placeholder="Optional"
              />
            </>
          )}

          {/* Add Button */}
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => { /* Handle adding beneficiary logic */ }}
            >
              Add Recipient
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddBeneficiaryModal;