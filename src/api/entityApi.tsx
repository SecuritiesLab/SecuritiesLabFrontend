import { EntityWithUsers } from '../types/Company';
import axiosInstance from './axiosConfig';

// Adjust your fetchCompanies function to handle the associated users
    export const fetchCompaniesWithUsers = async (email: string | null): Promise<EntityWithUsers[]> => {
    try {
      const response = await axiosInstance.get(`/with-users?email=${email}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching companies with users:', error);
      throw error;
    }
  };
  
  // Start KYB process for a company
  export const startKYB = async (companyId: Number) => {
    try {
      const response = await axiosInstance.post(`/entities/${companyId}/kyb`);
      return response.data;
    } catch (error) {
      console.error('Error starting KYB process:', error);
    }
  };

  export const updateUserRole = async (entityId: number, userId: number, newRole: string) => {
    try {
      const response = await axiosInstance.post(`/${entityId}/update-role`, null, {
        params: {
          userId: userId,
          newRole: newRole,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error updating user role:', error);
      throw new Error('Failed to update user role');
    }
  };
  
  // Add a new user to a company by email
  export const addUserToCompany = async (entityId: number, email: string) => {
    try {
      const response = await axiosInstance.post(`/${entityId}/add-user?email=${email}`);
      return response.data;
    } catch (error) {
      console.error('Error adding user to company:', error);
    }
  };
  
  export const createEntity = async (entityData: any, email: string | null) => {
    try {
      const response = await axiosInstance.post(`/entities?email=${email}`, entityData);
      return response.data;
    } catch (error) {
      console.error('Error creating entity:', error);
      throw error;
    }
  };
