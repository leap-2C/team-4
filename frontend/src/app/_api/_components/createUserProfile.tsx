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

export const createUserProfile = async (data: UserProfile) => {
  try {
  
    if (!data.id || !data.name) {
      throw new Error("Хэрэглэгчийн ID болон нэр шаардлагатай.");
    }

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Нэвтрэх токен олдсонгүй. Дахин нэвтэрнэ үү.");
    }

    console.log("Sending profile data:", data);
    const response = await axios.post(`${API_URL}/profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201 || response.status === 200) {
      console.log("Profile successfully created:", response.data);
      return response.data;
    }

    throw new Error(`Unexpected response status: ${response.status}`);
  } catch (error: any) {
    console.error("Error creating profile:", error);

    if (error.response?.status === 400) {
      const message = error.response.data.message;

      if (message === "Хэрэглэгчийн ID болон нэр шаардлагатай.") {
        throw new Error(
          "Хэрэглэгчийн ID болон нэр шаардлагатай талбарууд байна."
        );
      }
      if (message === "Профайл аль хэдийн бүртгэгдсэн байна.") {
        throw new Error("Профайл аль хэдийн бүртгэгдсэн байна.");
      }
      if (message === "Хэрэглэгч олдсонгүй.") {
        throw new Error("Хэрэглэгч олдсонгүй.");
      }

      throw new Error(message || "Буруу өгөгдөл оруулсан байна.");
    }

    if (error.response?.status === 401) {
      throw new Error("Нэвтрэх токен хүчингүй байна. Дахин нэвтэрнэ үү.");
    }

    if (error.response?.status === 500) {
      throw new Error("Серверийн алдаа гарлаа. Дахин оролдоно уу.");
    }

    throw new Error(error.message || "Тодорхойгүй алдаа гарлаа.");
  }
};
            