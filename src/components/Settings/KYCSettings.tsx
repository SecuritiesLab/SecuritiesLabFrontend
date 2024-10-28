import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, Box, Paper, Divider } from '@mui/material';
import axiosInstance from '../../api/axiosConfig';
import SumsubKycWidget from '../KYC/SumSubKycWidget';
import { getDecryptedData } from '../../authentication/EncryptAndDecryptData';
import { fetchApplicantDetails } from '../../api/sumSubApi';

interface Address {
  street: string;
  town: string;
  country: string;
  formattedAddress: string;
}

interface IdDoc {
  idDocType: string;
  country: string;
  firstName: string;
  lastName: string;
  issuedDate: string;
  issueAuthority: string;
  validUntil: string;
  number: string;
  additionalNumber: string;
  dob: string;
  gender: string;
  nationality: string;
  placeOfBirth: string;
  address: Address;
  mrzLine1: string;
  mrzLine2: string;
  mrzLine3: string;
}

interface Review {
  reviewId: string;
  reviewStatus: string;
  reviewResult: { reviewAnswer: string };
  attemptId: string;
  attemptCnt: number;
  elapsedSincePendingMs: number;
  elapsedSinceQueuedMs: number;
  reprocessing: boolean;
  levelName: string;
  createDate: string;
  reviewDate: string;
}

interface RiskLabels {
  attemptId: string;
  createdAt: string;
  device: string[];
}

interface ApplicantInfo {
  firstName: string;
  lastName: string;
  dob: string;
  country: string;
  nationality: string;
  addresses: Address[];
  gender: string;
  placeOfBirth: string;
  idDocs: IdDoc[];
}

interface ApplicantData {
  id: string;
  createdAt: string;
  email: string;
  externalUserId: string;
  info: ApplicantInfo;
  requiredIdDocs: { docSets: { idDocSetType: string; types: string[]; videoRequired?: string }[] };
  review: Review;
  applicantPlatform: string;
  ipCountry: string;
  authCode: string;
  riskLabels: RiskLabels;
}

const KYCSettings: React.FC = () => {
  const [kycStarted, setKycStarted] = useState(false);
  const [kycStatus, setKycStatus] = useState(false);
  const [applicantData, setApplicantData] = useState<ApplicantData | null>(null);
  const email = getDecryptedData('email');

  useEffect(() => {
    const fetchKycStatus = async () => {
      try {
        const response = await axiosInstance.get(`/users/user-details?email=${email}`); 
        setKycStatus(response.data.kycStatus);
      } catch (error) {
        console.error('Failed to fetch KYC status:', error);
      }
    };

    fetchKycStatus();
  }, []);

  const handleKycInitiation = () => {
    setKycStarted(true);
  };

  const handleKycCompleted = async () => {
    try {
      await axiosInstance.post('/sumsub/kyc-completed', { email, status: 'completed' });
      setKycStatus(true);
      const applicantDetails = await fetchApplicantDetails(email);
      setApplicantData(applicantDetails.data);
    } catch (error) {
      console.error('Failed to update KYC status:', error);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6">
          <b>KYC Status:</b> {kycStatus ? 'Completed' : 'Not Completed'}
        </Typography>
        {!kycStatus && (
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleKycInitiation}
              disabled={kycStarted}
            >
              Start KYC
            </Button>
          </Box>
        )}
      </Grid>

      {kycStarted && (
        <Grid item xs={12}>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">KYC Process</Typography>
            <SumsubKycWidget onKycCompleted={handleKycCompleted} />
          </Box>
        </Grid>
      )}

      {kycStatus && applicantData && (
        <>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" color="primary">Applicant Information</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1"><b>Name:</b> {applicantData.info.firstName} {applicantData.info.lastName}</Typography>
              <Typography variant="body1"><b>Date of Birth:</b> {applicantData.info.dob}</Typography>
              <Typography variant="body1"><b>Country:</b> {applicantData.info.country}</Typography>
              <Typography variant="body1"><b>Nationality:</b> {applicantData.info.nationality}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" color="primary">Address</Typography>
              <Divider sx={{ my: 1 }} />
              {applicantData.info.addresses.map((address, index) => (
                <Box key={index} sx={{ mb: 1 }}>
                  <Typography variant="body2"><b>Street:</b> {address.street}</Typography>
                  <Typography variant="body2"><b>Town:</b> {address.town}</Typography>
                  <Typography variant="body2"><b>Country:</b> {address.country}</Typography>
                  <Typography variant="body2"><b>Formatted:</b> {address.formattedAddress}</Typography>
                </Box>
              ))}
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" color="primary">ID Documents</Typography>
              <Divider sx={{ my: 1 }} />
              {applicantData.info.idDocs.map((doc, index) => (
                <Box key={index} sx={{ mb: 1 }}>
                  <Typography variant="body2"><b>Type:</b> {doc.idDocType}</Typography>
                  <Typography variant="body2"><b>Number:</b> {doc.number}</Typography>
                  <Typography variant="body2"><b>Issued Date:</b> {doc.issuedDate}</Typography>
                  <Typography variant="body2"><b>Valid Until:</b> {doc.validUntil}</Typography>
                </Box>
              ))}
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" color="primary">Review Status</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1"><b>Review ID:</b> {applicantData.review.reviewId}</Typography>
              <Typography variant="body1"><b>Status:</b> {applicantData.review.reviewStatus}</Typography>
              <Typography variant="body1"><b>Answer:</b> {applicantData.review.reviewResult.reviewAnswer}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" color="primary">Risk Labels</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1"><b>Device:</b> {applicantData.riskLabels.device.join(', ')}</Typography>
            </Paper>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default KYCSettings;