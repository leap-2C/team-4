import axios from "axios";
import { API_URL } from "../api";

export interface Password {
  id: string;
  password: string;
}

export const updatepassword = async (data: Password) => {
  try {
    console.log(data);
    
    const token = localStorage.getItem("token");
    console.log(token);
    
    const response = await axios.put(`${API_URL}/users/${data.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      password: data.password,
    });
    console.log(response);
    
    if (!response.data) {
      throw new Error("Password update failed!");
    }

    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Password update failed");
  }
};
