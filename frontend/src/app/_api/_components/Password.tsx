import axios from "axios";
import { API_URL } from "../api";

export interface Password {
  id: string;
  name: string;
  password: string;
}

export const updatepassword = async (data: Password) => {
  try {
    const response = await axios.patch(`${API_URL}/${data.id}`, data);
    if (!response.data) {
      throw new Error("Password update failed!");
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Password update failed");
  }
};
