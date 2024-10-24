import axiosInstance from './axiosConfig';

export const getAccessToken = async (userId: string,levelName: String) => {
    try {
      const response = await axiosInstance.post(`/sumsub/accessToken?userId=${userId}&levelName=${levelName}`);
      return response.data;
    } catch (error) {
      throw new Error("Error sending OTP. Please try again.");
    }
  };
  