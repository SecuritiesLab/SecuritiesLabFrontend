
// src/types/Company.ts

export interface UserWithRole {
    userId: number;
    userName: string;
    roleName: string;
  }
  
  export interface EntityWithUsers {
    entityId: number;
    entityName: string;
    entityAddress: string;
    entityRegistrationNumber: string;
    entityIndustry: string;
    kybStatus: string;
    role: string; // User’s role for this entity
    associatedUsers: {
      userId: number;
      userName: string;
      roleName: string;
    }[]; // List of users associated with this entity
  }