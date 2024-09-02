import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './screens/LandingPage';
import TypeformPage from './screens/TypeformPage';
import SignInPage from './screens/SignInPage';
import SignUpPage from './screens/SignUpPage';
import TermsAndConditionsPage from './screens/TermsAndConditionsPage';

function App() {
  const [mode, setMode] = React.useState('light');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/typeform" element={<TypeformPage/>} />
        <Route path="/signin" element={<SignInPage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/termsAndConditions" element={<TermsAndConditionsPage/>} />
      </Routes>
    </Router>
  );
}

export default App;