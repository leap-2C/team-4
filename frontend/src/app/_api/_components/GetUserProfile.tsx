import axios from "axios";
import { API_URL } from "../api";

export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      throw new Error("Token or userId not found in localStorage");
    }

    const response = await axios.get(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch profile:", error.response?.data || error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch user profile"
    );
  }
};
