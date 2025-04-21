import axios from "axios";
import { API_URL } from "../api";

export interface Profile {
  socialMediaURL: string;
  about: string;
  id: string;
  name: string;
  avatarImage: string | null;
  bio: string | null;
  link: string | null;
  
}

export const getOwnUserProfile = async (userId: string): Promise<Profile> => {
  
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      throw new Error("Хэрэглэгчийн ID оруулна уу.");
    }
    const response = await axios.get(`${API_URL}/profile/${userId}`);
    if (response.status === 200) {
      if (response.data && typeof response.data === "object" && response.data.id) {
        return response.data;
      }
      throw new Error(
        response.data?.message || "Сервертэй холбогдоход алдаа гарлаа."
      );
    }
    throw new Error("Сервертэй холбогдоход алдаа гарлаа.");
  } catch (error: any) {
    console.error("Error fetching profile:", error, "Response data:", error.response?.data);
    if (error.response?.status === 401) {
      throw new Error("Хандах эрхгүй байна.");
    }
    if (error.response?.status === 404) {
      throw new Error("Хэрэглэгчийн мэдээлэл олдсонгүй.");
    }
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        "Хэрэглэгчийн мэдээлэл татахад алдаа гарлаа."
    );
  }
};