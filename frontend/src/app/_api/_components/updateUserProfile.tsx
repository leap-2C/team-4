import axios from "axios";
import { API_URL } from "../api";

interface UserProfile {
  id: string;
  name?: string;
  about?: string;
  avatarImage?: string;
  socialMediaURL?: string;
  backgroundImage?: string;
  successMessage?: string;
}

export const updateUserProfile = async (data: UserProfile) => {
  try {
    const response = await axios.put(`${API_URL}/profile/${data.id}`, data);

    if (response.status === 200) {
      return response.data;
    }
    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Error("User ID is required. Please log in again.");
    }
    if (error.response?.status === 500) {
      throw new Error("Server error: Profile not found or database issue.");
    }
  }
};