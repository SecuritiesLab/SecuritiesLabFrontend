import axiosInstance from './axiosConfig';
import { UserRequest } from '../types/UserRequest';
import { OtpRequest } from '../types/OtpRequest';
import { SignInRequest } from '../types/SignInRequest';

// Service to handle signup
export const signupUser = async (userData: UserRequest) => {
  try {
    const response = await axiosInstance.post('/users/signup', userData);
    return response.data; // Handle success
  } catch (error: any) {
    if (error.response && error.response.status === 409) {
      throw new Error("Email already in use.");
    }
    throw new Error("Error during signup. Please try again.");
  }
};

// Service to handle OTP verification
export const verifyOtp = async (otpData: OtpRequest) => {
  try {
    const response = await axiosInstance.post('/users/verify-otp', otpData);
    return response.data; // Handle success
  } catch (error) {
    console.error('OTP Verification Error:', error);
    throw error;
  }
};

// Service to handle Sign-in
export const signinUser = async (signinData: SignInRequest) => {
  try {
    console.log(signinData)
    const response = await axiosInstance.post('/auth/signin', signinData);
    // Store the JWT token in localStorage after successful login
    localStorage.setItem('token', response.data.token);  // Assuming the token is in response.data.token
    return response.data; // Handle success
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      throw new Error("Invalid email or password.");
    }
    if (error.response && error.response.status === 403) {
      throw new Error("User not verified.");
    }
    throw new Error("Error during sign-in. Please try again.");
  }
};