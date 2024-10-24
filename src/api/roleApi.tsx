import axiosInstance from './axiosConfig'; // Assuming you have axios instance setup

// Service to fetch roles
export const fetchRoles = async () => {
  try {
    const response = await axiosInstance.get('/roles'); // Assuming your backend is serving roles at /roles
    return response.data; // Return the list of roles
  } catch (error) {
    console.error("Error fetching roles:", error);
    throw new Error("Error fetching roles.");
  }
};