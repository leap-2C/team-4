import axios from "axios";
import { API_URL } from "../api";

interface UserProfile {
  id: string;
  name: string;
  about: string;
  avatarImage: string;
  socialMediaURL: string;
  backgroundImage: string;
  successMessage: string;
}

export const createUserProfile = async (data: UserProfile) => {
  try {
    console.log("Sending profile data:", data); 
    const response = await axios.post(`${API_URL}/profile`, data);
    console.log("API response:", response);

    if (response.status === 400) {
      if (response.data.message === "Server error.") {
        throw new Error("Server error occurred while creating profile. Please try again.");
      }
      if (response.data.message === "User ID, and name are required.") {
        throw new Error("User ID and name are required fields.");
      }
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error: any) {
  }
};