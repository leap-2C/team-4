import axios from "axios";

const API_URL = "https://backend-tawny-delta.vercel.app";

interface User {
  email: string;
  password: string;
  name: string;
}
interface UserProfile {
  id: string;
  name: string;
  about: string;
  AvatarImage: string;
  socialMediaURL: string;
  backgroundImage: string;
  successMessage: string;
}

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

export interface Password {
  id: string;
  name: string;
  password: string;
}


export const signUp = async (data: User) => {
  try {
    const response = await axios.post(`${API_URL}/users`, data);
    if (!response.data || !response.data.id) {
      throw new Error("Signup failed: No user data returned");
    }
    localStorage.setItem("userId", response.data.id);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userEmail", data.email);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Signup failed");
  }
};

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, data);
    if (response.status === 200 && response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("userEmail", data.email); // Add
      return response.data;
    }
    throw new Error("Login failed");
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};
export const createUserProfile = async (data: UserProfile) => {
  try {
    const response = await axios.post(`${API_URL}/profile`, data, {
    });
    if (response.status === 200 && response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      return response.data;
    }
    if (!response.data) {
      throw new Error("Profile creation failed!");
    }
    return response.data;
  } catch (error: any) {
  
  }

};
export const updatepaymentDetails = async (data: PaymentDetails) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.patch(`${API_URL}/bank-card/${data.id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.data) {
      throw new Error("Payment detail update failed!");
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Payment detail update failed");
  }
};
export const getUserProfile = async () => {
  try {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!userId) {
      throw new Error("User ID not found");
    }
    const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    const response = await axios.get(`${API_URL}/profile/${userId}`, config);
    if (!response.data) {
      throw new Error("Failed to fetch user profile");
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch user profile");
  }
};

export const getpaymentDetails = async (
  data: GetPaymentDetailsInput
): Promise<PaymentDetails> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_URL}/bank-card/${data.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.data) {
      throw new Error("Fetching payment details failed!");
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Fetching payment details failed");
  }
};

export const updatepassword = async (data: Password) => {
  try {
    const response = await axios.patch(`${API_URL}/${data.id}`, data);
    if (!response.data) {
      throw new Error("Password update failed!");
    }
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Password update failed");
  }
};
