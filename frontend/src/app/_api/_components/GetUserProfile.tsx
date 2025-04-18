
import axios from "axios";
import { API_URL } from "../api";

export const getUserProfile = async (userId: string) => {
  try {
    if (!userId) {
      throw new Error("Хэрэглэгчийн ID оруулна уу.");
    }
    const response = await axios.get(`${API_URL}/profile/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200 || response.status === 400) {
      if (response.data && typeof response.data === "object" && response.data.id) {
        return response.data;
      }
      throw new Error(
        response.data?.message || "Сервертэй холбогдоход алдаа гарлаа."
      );
    } else if (response.status === 404) {
      throw new Error("Хэрэглэгчийн мэдээлэл олдсонгүй.");
    } else {
      throw new Error("Сервертэй холбогдоход алдаа гарлаа.");
    }
  } catch (error: any) {
    console.error("Error fetching profile:", error, "Response data:", error.response?.data);
    if (error.response?.status === 401) {
      throw new Error("Хандах эрхгүй байна.");
    }
    if (error.response?.status === 400) {
      throw new Error(
        error.response.data?.message || "Сервертэй холбогдоход алдаа гарлаа."
      );
    }
    throw new Error(
      error.message || "Хэрэглэгчийн мэдэээл татахад алдаа гарлаа."
    );
  }
};
