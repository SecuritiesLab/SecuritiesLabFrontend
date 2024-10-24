// api/twoFactorApi.ts
import axiosInstance from './axiosConfig';

export const generateTwoFactorSecret = async (email:string) => {
  const response = await axiosInstance.get(`2fa/generate?email=${email}`); // Adjust endpoint accordingly
  return response.data;
};

export const verifyTwoFactorCode = async (email:string, code: string) => {
  const response = await axiosInstance.post(`2fa/verify?email=${email}&code=${code}`);
  return response.data;
};

export const disableTwoFactor = async (email:string) => {
  const response = await axiosInstance.post(`2fa/disable-2fa`, { email });
  return response.data;
};