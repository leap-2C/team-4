import axios from "axios";
import { API_URL } from "../api";

export interface Password {
  id: string;
  password: string;
}

export const updatepassword = async (data: Password) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Нэвтрэх токен олдсонгүй. Дахин нэвтэрнэ үү.");
    }

    const response = await axios.put(
      `${API_URL}/users/${data.id}`,
      { password: data.password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data) {
      throw new Error("Нууц үг шинэчлэхэд алдаа гарлаа!");
    }

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Нууц үг шинэчлэхэд алдаа гарлаа"
    );
  }
};
