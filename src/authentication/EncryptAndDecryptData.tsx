import CryptoJS from 'crypto-js';

// Define the secret key
const secretKey = '0ecc5b41eb453b81046788bd2177aac1710919e1db21853976ae26214920d29c';  // Use a strong key in production

// Encrypt the data (e.g., email)
export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

// Store the encrypted data in localStorage
export const storeEncryptedData = (key: string, data: string): void => {
  const encryptedData = encryptData(data);
  localStorage.setItem(key, encryptedData);
};

// Decrypt the data
export const decryptData = (cipherText: string): string => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Retrieve the encrypted data from localStorage and decrypt it
export const getDecryptedData = (key: string): string | null => {
  const encryptedData = localStorage.getItem(key);
  if (!encryptedData) return null;
  return decryptData(encryptedData);
};