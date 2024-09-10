import axios from 'axios';
import { UserRequest} from '../types/UserRequest';
import { OtpRequest } from '../types/OtpRequest';

const BASE_URL = 'http://localhost:8080/api/users';

// Service to handle signup
export const signupUser = async (userData: UserRequest) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, userData);
    return response.data; // Handle success
  } catch (error: any) {
    // If it's a 409 conflict, the email is already in use
    if (error.response && error.response.status === 409) {
      throw new Error("Email already in use.");
    }
    // For any other errors, throw a generic error
    throw new Error("Error during signup. Please try again.");
  }
};

// Service to handle OTP verification
export const verifyOtp = async (otpData: OtpRequest) => {
  try {
    const response = await axios.post(`${BASE_URL}/verify-otp`, otpData);
    return response.data; // Handle success
  } catch (error) {
    console.error('OTP Verification Error:', error);
    throw error; // Handle error
  }
};