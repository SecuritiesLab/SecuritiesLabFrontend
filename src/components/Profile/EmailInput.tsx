import * as React from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';

interface EmailInputProps {
  onSubmit: (email: string) => void;
  buttonText: string;
  successMessage?: string;
  errorMessage?: string;
}

export const EmailInput: React.FC<EmailInputProps> = ({ onSubmit, buttonText, successMessage, errorMessage }) => {
  const [email, setEmail] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(email);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Enter your email"
        name="email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      {successMessage && <Typography color="primary">{successMessage}</Typography>}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {buttonText}
      </Button>
    </Box>
  );
};