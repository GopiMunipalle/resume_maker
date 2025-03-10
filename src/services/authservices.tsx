import { apiConfig } from "../config/apiConfig";

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(apiConfig.login, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error.message;
  }
};

export const register = async (userData: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  try {
    const response = await fetch(apiConfig.signUp, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (response.ok) {
      return { data, status: true };
    }
    return data.message[0];
  } catch (error: any) {
    return error.message;
  }
};
