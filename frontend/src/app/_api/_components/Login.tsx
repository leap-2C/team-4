import axios from "axios";
import { API_URL } from "../api";

export const login = async (data: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, data);

    if (response.status === 200 && response.data.token) {
      const token = response.data.token;
      const userId = response.data.userId;

     
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userEmail", data.email);

 
      const profileResponse = await axios.get(`${API_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const name = profileResponse.data.name;
      localStorage.setItem("name", name);

      return {
        token,
        userId,
        name,
      };
    }

    throw new Error("Login failed");
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
