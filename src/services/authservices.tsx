import { apiConfig } from "../config/apiConfig";

export const login = async ({ email, otp }: { email: string; otp: string }) => {
  try {
    const response = await fetch(apiConfig.login, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const data = await response.json();
    if (response.ok) {
      return { data, status: true };
    }
    return data;
  } catch (error: any) {
    return error.message;
  }
};

export const register = async (userData: { email: string }) => {
  try {
    const response = await fetch(apiConfig.signUp, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (data.statusCode === 200 || data.statusCode === 201) {
      return { data, status: true };
    }
    return data;
  } catch (error: any) {
    return error.message;
  }
};

export const fetchUserData = async (token: string) => {
  try {
    const response = await fetch(apiConfig.user, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error.message;
  }
};

export const updateUserData = async (token: string, userData: any) => {
  try {
    const response = await fetch(apiConfig.user, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error.message;
  }
};

export const removeUserAccount = async (token: string) => {
  try {
    const response = await fetch(apiConfig.removeUser, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error.message;
  }
};
