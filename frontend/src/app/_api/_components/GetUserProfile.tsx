import axios from "axios";
import { API_URL } from "../api";

export const getUserProfile = async (userId: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token || !userId) {
    }

    console.log("Fetching profile for userId:", userId); 
    const response = await axios.get(`${API_URL}/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Profile response:", response.data);
    if (response.status === 400) {
      if (response.data.message === "Profile not found.") {
        throw new Error("Profile not found for this user.");
      }
      if (response.data.message === "Server error.") {
        throw new Error("Server error while fetching profile.");
      }
      return response.data;
    }
    return response.data;
  } catch (error: any) {
  }
};
