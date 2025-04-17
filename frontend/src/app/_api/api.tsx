import axios from "axios";

export const API_URL = "https://backend-tawny-delta.vercel.app";

export interface PaymentDetails {
  id: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  firstName: string;
  lastName: string;
  country: string;
}

export interface GetPaymentDetailsInput {
  id: string;
}

