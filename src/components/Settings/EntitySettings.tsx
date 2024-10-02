import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, Box, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

interface Company {
  id: number;
  name: string;
  kybStatus: string;
  address: string;
  registrationNumber: string;
  industry: string;
  role: String;
}

const EntitySettings: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  
  // Dummy company data, including XYZ Payments UAB
  useEffect(() => {
    const fetchCompanies = async () => {
      const dummyCompanies: Company[] = [
        {
          id: 1,
          name: 'XYZ Payments UAB',
          kybStatus: 'Not Completed',
          address: '123 Business St, Vilnius, Lithuania',
          registrationNumber: '123456789',
          industry: 'Fintech',
          role: "Admin"
        },
        {
          id: 2,
          name: 'ABC Payments UAB',
          kybStatus: 'Completed',
          address: '456 Finance Ave, Vilnius, Lithuania',
          registrationNumber: '987654321',
          industry: 'Payment Solutions',
          role: "Admin"
        },
      ];
      setCompanies(dummyCompanies);
    };

    fetchCompanies();
  }, []);

  // Handle selecting a company to show its details in a popup
  const handleCompanyClick = (company: Company) => {
    setSelectedCompany(company);
    setIsDialogOpen(true);
  };

  // Handle closing the dialog
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedCompany(null);
  };

  // Handle starting KYB for a company
  const handleStartKYB = (companyId: number) => {
    console.log('Starting KYB for company:', companyId);
    // Call API to start KYB process for the company
  };

  // Handle adding a new company
  const handleAddNewCompany = () => {
    const newCompany: Company = {
      id: companies.length + 1,
      name: newCompanyName,
      kybStatus: 'Not Completed',
      address: 'New Company Address',
      registrationNumber: '000000000',
      industry: 'New Industry',
      role: "Admin"
    };
    setCompanies([...companies, newCompany]);
    setNewCompanyName('');
  };

  return (
    <Grid container spacing={2}>
      {/* Company List Section */}
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Company List
        </Typography>
        {companies.length === 0 ? (
          <Typography>No companies available.</Typography>
        ) : (
          companies.map((company) => (
            <Paper key={company.id} sx={{ p: 2, mb: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box onClick={() => handleCompanyClick(company)} style={{ cursor: 'pointer' }}>
                  <Typography variant="h6">{company.name}</Typography>
                  <Typography variant="body2">
                    KYB Status: {company.kybStatus === 'Completed' ? 'Completed' : 'Not Completed'}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleStartKYB(company.id)}
                  disabled={company.kybStatus === 'Completed'}
                >
                  {company.kybStatus === 'Completed' ? 'KYB Completed' : 'Start KYB'}
                </Button>
              </Box>
            </Paper>
          ))
        )}

        {/* Button to Add New Company */}
        <Box mt={2}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Add Company
          </Button>
        </Box>
      </Grid>

      {/* Dialog for showing company details */}
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Company Details</DialogTitle>
        {selectedCompany && (
          <DialogContent>
            <Typography variant="body1">
              <strong>Name:</strong> {selectedCompany.name}
            </Typography>
            <Typography variant="body1">
              <strong>Address:</strong> {selectedCompany.address}
            </Typography>
            <Typography variant="body1">
              <strong>Registration Number:</strong> {selectedCompany.registrationNumber}
            </Typography>
            <Typography variant="body1">
              <strong>Industry:</strong> {selectedCompany.industry}
            </Typography>
            <Typography variant="body1">
              <strong>KYB Status:</strong> {selectedCompany.kybStatus}
            </Typography>
            <Typography variant="body1">
              <strong>Role:</strong> {selectedCompany.role}
            </Typography>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default EntitySettings;