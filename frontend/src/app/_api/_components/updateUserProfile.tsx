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
    // Валидаци
    if (!data.id || !data.name) {
      throw new Error("Хэрэглэгчийн ID болон нэр шаардлагатай.");
    }

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Нэвтрэх токен олдсонгүй. Дахин нэвтэрнэ үү.");
    }

    // Токены утгыг шалгах
    if (token.trim() === "") {
      throw new Error("Токен хоосон байна. Дахин нэвтэрнэ үү.");
    }

    console.log("Updating profile data:", data);
    console.log("Using token:", token); // Токеныг дебаг хийх
    const response = await axios.put(`${API_URL}/profile/${data.id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log("Profile updated:", response.data);
      return response.data;
    }

    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error: any) {
    console.error("Error updating profile:", error);

    if (error.response?.status === 401) {
      // Серверээс ирсэн мессежийг шалгах
      const message =
        error.response.data.message ||
        "Нэвтрэх токен хүчингүй байна. Дахин нэвтэрнэ үү.";
      localStorage.removeItem("token"); // Хүчингүй токеныг устгах
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

    // Сүлжээний алдаа эсвэл бусад
    throw new Error(
      error.message || "Сүлжээний алдаа эсвэл тодорхойгүй алдаа гарлаа."
    );
  }
};
