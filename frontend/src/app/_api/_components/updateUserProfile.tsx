import axios from "axios";
import { API_URL } from "../api";
interface UserProfile {
  id: string;
  name: string;
  about: string;
  avatarImage: string;
  socialMediaURL: string;
  backgroundImage: string;
}

export const updateUserProfile = async (data: UserProfile) => {
  try {
    if (!data.id) {
      throw new Error("Хэрэглэгчийн ID болон нэр шаардлагатай.");
    }
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Нэвтрэх токен олдсонгүй. Дахин нэвтэрнэ үү.");
    }

    if (token.trim() === "") {
      throw new Error("Токен хоосон байна. Дахин нэвтэрнэ үү.");
    }

    const response = await axios.put(`${API_URL}/profile/${data.id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    }

    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error: any) {

    if (error.response?.status === 401) {
      const message =
        error.response.data.message ||
        "Нэвтрэх токен хүчингүй байна. Дахин нэвтэрнэ үү.";
      localStorage.removeItem("token"); 
      localStorage.removeItem("userId");
      throw new Error(message);
    }

    if (error.response?.status === 400) {
      const message =
        error.response.data.message || "Буруу өгөгдөл оруулсан байна.";
      throw new Error(message);
    }

    if (error.response?.status === 404) {
      throw new Error("Профайл олдсонгүй.");
    }

    if (error.response?.status === 500) {
      throw new Error("Серверийн алдаа гарлаа. Дахин оролдоно уу.");
    }

    throw new Error(
      error.message || "Сүлжээний алдаа эсвэл тодорхойгүй алдаа гарлаа."
    );
  }
};
