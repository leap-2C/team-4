
import axios from "axios";
import { API_URL } from "../api";

export const getAllProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch profiles");
    }
  } catch (error: any) {
    console.error("Error fetching profiles:", error);
    throw error;
  }
};
