import axiosInstance from './axiosConfig';
import { UserRequest } from '../types/UserRequest';
import { OtpRequest } from '../types/OtpRequest';
import { SignInRequest } from '../types/SignInRequest';
import { ResetPasswordRequest } from '../types/ResetPasswordRequest';

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

export const signinUser = async (signinData: SignInRequest) => {
  try {
    const response = await axiosInstance.post('/auth/signin', signinData);
    console.log(response)
    // If 2FA is required for the user
    if (response.data.status === "2FA required") {
      return { twoFactorRequired: true, email: signinData.email };
    }
    // Otherwise, store the JWT token in localStorage after successful login
    localStorage.setItem('token', response.data.token);  // Assuming the token is in response.data.token
    return { twoFactorRequired: false }; // No 2FA required, return success
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

export const forgotPassword = async (email: string) => {
  try {
    const response = await axiosInstance.post(`/auth/forgot-password?email=${email}`);
    return response.data;
  } catch (error) {
    throw new Error("Error sending OTP. Please try again.");
  }
};

export const resetPassword = async (resetPasswordRequest: ResetPasswordRequest) => {
  try {
    console.log(resetPasswordRequest)
    const response = await axiosInstance.post(`/auth/reset-password`, resetPasswordRequest);
    return response.data;
  } catch (error) {
    throw new Error("Error resetting password. Please check your OTP and try again.");
  }
};