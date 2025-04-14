import axios from "axios";

const API_URL = "https://backend-tawny-delta.vercel.app";

interface User {
  email: string;
  password: string;
  name: string;
}
interface UserProfile {
    id: string;
  name: string;
  about: string;
  AvatarImage: string;
  socialMediaURL: string;
  backgroundImage: string;
    successMessage: string;  
}

export const signUp = async (data: User) => {
  try {
    const response = await axios.post(`${API_URL}/users`, data);
    if (!response.data) {
      throw new Error("Signup failed !");
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Signup failed catch");
  }
};

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, data);
    if (response.status === 200 && response.data.token) {
      localStorage.setItem("token", response.data.token);
      return response.data;
    }
    throw new Error("Login failed");
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
export const createUserProfile = async ( data: UserProfile) => {
    try {
        const response = await axios.post(`${API_URL}/profile`, data);
        if (!response.data) {
            throw new Error("Profile creation failed!");
        }
        return response.data;
    }   catch (error: any) {
        throw new Error(error.response?.data?.message || "Profile creation failed");
    }
}