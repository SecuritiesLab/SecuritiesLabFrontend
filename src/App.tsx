import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import TypeformPage from './screens/TypeformPage';
import SignInPage from './screens/SignInPage';
import SignUpPage from './screens/SignUpPage';
import TermsAndConditionsPage from './screens/TermsAndConditionsPage';
import CompanyTermsPage from './screens/CompanyTermsPage';
import DashboardPage from './screens/DashboardPage';
import OtpVerification from './screens/OtpVerificationPage';
import ForgotPasswordPage from './screens/LoginModule/ForgotPasswordPage';
import ResetPasswordPage from './screens/LoginModule/ResetPasswordPage';
import PrivacyPolicy from './components/PrivacyPolicy'
import ProtectedRoute from './authentication/ProtectedRoute';
import './i18n';
import KycPage from './screens/LoginModule/kycPage';

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
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}  />
        <Route path="/otp-verification" element={<OtpVerification/>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
        <Route path="/reset-password" element={<ResetPasswordPage/>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/kyc" element={<KycPage />} />
      </Routes>
    </Router>
  );
}

export default App;