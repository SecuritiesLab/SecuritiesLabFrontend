import React from 'react';
import { Box, Card, Typography, Button } from '@mui/material';

export interface Fund {
    id: number;
    name: string;
    sector: string;
    yield: string;
    minInvestment: number;
    type: string;
    currency: string;
    logo: string;
  }

interface FundListProps {
  funds: Fund[];
  handleInvestClick: (fund: Fund) => void;
  handleRedeemClick: (fund: Fund) => void;
}

const FundList: React.FC<FundListProps> = ({ funds, handleInvestClick, handleRedeemClick }) => {
  return (
    <Box
      sx={{
        border: '1px solid #4a4a4a',
        borderRadius: 2,
        padding: 2,
        backgroundColor: '#1e1e1e',
        height: 500,
        overflowY: 'auto',
      }}
    >
      {funds.map((fund) => (
        <Card
          key={fund.id}
          sx={{
            marginBottom: 2,
            padding: 2,
            height: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Left side: Logo and text */}
            <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '70%' }}>
              <img
                src={fund.logo}
                alt={`${fund.name} logo`}
                style={{ width: '80px', height: '80px', marginRight: '24px', objectFit: 'contain' }}
              />
              <Box>
                <Typography variant="h6">{fund.name}</Typography>
                <Typography variant="body2">
                  Sector: {fund.sector} | Yield: {fund.yield} | Minimum Investment: {fund.currency}{' '}
                  {fund.minInvestment}
                </Typography>
              </Box>
            </Box>

            {/* Right side: Buttons */}
            <Box sx={{ minWidth: '30%' }}>
              <Button
                variant="contained"
                sx={{ marginRight: 1, marginBottom: 1 }}
                onClick={() => handleInvestClick(fund)}
              >
                Invest
              </Button>
              <Button variant="outlined" onClick={() => handleRedeemClick(fund)}>
                Redeem
              </Button>
            </Box>
          </Box>
        </Card>
      ))}
    </Box>
  );
};

export default FundList;