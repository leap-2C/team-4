import axios from "axios";
import { API_URL } from "../api";

export const login = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, data);

    if (response.status === 200 && response.data.userId) {
      const userId = response.data.userId;
      localStorage.setItem("userId", userId);
      localStorage.setItem("userEmail", data.email);

      return {
        userId,
        message: response.data.message,
      };
    }

    throw new Error("Login failed");
  } catch (error: any) {
    throw error.response?.data || { message: "Login failed" };
  }
};