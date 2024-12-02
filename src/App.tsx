import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import TypeformPage from './screens/TypeformPage';
import SignInPage from './screens/LoginModule/SignInPage';
import SignUpPage from './screens/LoginModule/SignUpPage';
import TermsAndConditionsPage from './screens/TermsAndConditionsPage';
import CompanyTermsPage from './screens/LoginModule/CompanyTermsPage';
import DashboardPage from './screens/DashboardPage';
import OtpVerification from './screens/LoginModule/OtpVerificationPage';
import ForgotPasswordPage from './screens/LoginModule/ForgotPasswordPage';
import ResetPasswordPage from './screens/LoginModule/ResetPasswordPage';
import PrivacyPolicy from './components/PrivacyPolicy'
import ProtectedRoute from './authentication/ProtectedRoute';
import './i18n';
import KycPage from './screens/LoginModule/kycPage';
import TwoFactorPage from './screens/LoginModule/ TwoFactorPage';
import SettingsPage from './screens/Settings/SettingsPage';
import Layout from './components/Layout';
import BankAccountsPage from './screens/BankAccounts/BankAccountPage';
import TreasurySafeguardingPage from './screens/TreasurySafeguarding/TreasurySafeguardingPage';
import EarnedDepositsPage from './screens/Deposits/EarnedDepositPage';
import ApiDocumentationPage from './screens/Deposits/ApiDocumentationPage';
import DepositDetailsPage from './screens/Deposits/DepositDetailsPage';
import RedirectPage from './screens/BankAccounts/RedirectPage';
import CryptoWalletPage from './screens/Wallets/CryptoWallet';

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
        <Route path="/otp-verification" element={<OtpVerification/>} />
        <Route path="/forgot-password" element={<ForgotPasswordPage/>} />
        <Route path="/reset-password" element={<ResetPasswordPage/>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/kyc" element={<KycPage />} />
        <Route path="/2fa" element={<TwoFactorPage />} />
      {/* Protect the Dashboard and Settings Pages with layout */}
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/accounts" element={<BankAccountsPage />} />
          <Route path="/safeguarding" element={<TreasurySafeguardingPage />} />
          <Route path="/deposit" element={<EarnedDepositsPage />} />
          <Route path="/documentation" element={<ApiDocumentationPage />} />
          <Route path="/deposit/:id" element={<DepositDetailsPage />} />
          <Route path="/redirect" element={<RedirectPage />} />
          <Route path="/wallet" element={<CryptoWalletPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;