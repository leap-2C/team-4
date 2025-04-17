// GetPayment.tsx
import axios from "axios";
import { API_URL } from "../api";
import { PaymentDetails } from "../api";

export const getpaymentDetails = async (
  token: string
): Promise<PaymentDetails> => {
  try {
    const response = await axios.get(`${API_URL}/bank-card/`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.data) {
      throw new Error("Fetching payment details failed!");
    }

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Fetching payment details failed"
    );
  }
};
