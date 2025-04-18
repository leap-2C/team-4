import axios from "axios";
import { API_URL } from "../api";

export const createDonation = async (
  token: string,
  amount: number,
  message: string,
  userId: string,
  charityId: string,
  paymentMethod: string,
  cardNumber: string,
  expiryDate: string,
  cvv: string,
  firstName: string,
  lastName: string,
  country: string
): Promise<any> => {
  try {
    const response = await axios.post(
      `${API_URL}/donation`,
      {
        amount,
        message,
        userId,
        charityId,
        paymentMethod,
        cardNumber,
        expiryDate,
        cvv,
        firstName,
        lastName,
        country
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to create donation");
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Creating donation failed"
    );
  }
}