import axios from "axios";
import { API_URL } from "../api";

interface UserProfile {
  id: string;
  name: string;
  about: string;
  AvatarImage: string;
  socialMediaURL: string;
  backgroundImage: string;
  successMessage: string;
}

export const createUserProfile = async (data: UserProfile) => {
  try {
    const response = await axios.post(`${API_URL}/profile`, data, {});
    if (response.status === 200 && response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      return response.data;
    }
    if (!response.data) {
      throw new Error("Profile creation failed!");
    }
    return response.data;
  } catch (error: any) {}
};
