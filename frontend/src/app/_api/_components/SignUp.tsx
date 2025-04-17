import axios from "axios";
import { API_URL } from "../api";

interface User {
  email: string;
  password: string;
  name: string;
}

export const signUp = async (data: User) => {
  try {
    const response = await axios.post(`${API_URL}/users`, data);
    if (!response.data || !response.data.id) {
      throw new Error("Signup failed: No user data returned");
    }
    localStorage.setItem("userId", response.data.id);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userEmail", data.email);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Signup failed");
  }
};
