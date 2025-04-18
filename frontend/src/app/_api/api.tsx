import axios from "axios";

export const API_URL = "http://localhost:5000";

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

