import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import TypeformPage from './screens/TypeformPage';
import SignInPage from './screens/SignInPage';
import SignUpPage from './screens/SignUpPage';
import TermsAndConditionsPage from './screens/TermsAndConditionsPage';
import CompanyTermsPage from './screens/CompanyTermsPage';
import DashboardPage from './screens/DashboardPage';
import OtpVerification from './screens/OtpVerificationPage';

function App() {
  const [mode, setMode] = React.useState('light');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/get-early-access" element={<TypeformPage/>} />
        <Route path="/signin" element={<SignInPage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/termsAndConditions" element={<TermsAndConditionsPage/>} />
        <Route path="/terms-and-conditions" element={<CompanyTermsPage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="/otp-verification" element={<OtpVerification/>} />
      </Routes>
    </Router>
  );
}

export default App;