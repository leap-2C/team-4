import axios from "axios";
import { API_URL } from "../api";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  userId: string;
  token: string;
  message: string;
  name: string
}

export const login = async (data: LoginPayload): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, data);

    if (
      response.status === 200 &&
      response.data.userId &&
      response.data.token
    ) {
      const { userId, token, message } = response.data;

      // Token, userId-г хадгалах
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userEmail", data.email);

      return { userId, token, message };
    }

    throw new Error("Login failed");
  } catch (error: any) {
    throw error.response?.data || { message: "Login failed" };
  }
};
