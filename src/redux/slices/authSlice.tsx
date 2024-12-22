import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiConfig } from "../../config/apiConfig";

export interface AuthState {
  id: string | null;
  name: string;
  email: string;
  role: string;
  token: string;
  isLoggedIn: boolean;
  error: string | null;
  isLoading: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export const initialState: AuthState = {
  id: null,
  name: "",
  email: "",
  role: "",
  token: "",
  isLoggedIn: false,
  error: null,
  isLoading: false,
  createdAt: null,
  updatedAt: null,
};

export const initializeData = async () => {
  return JSON.parse(localStorage.getItem("user") || "{}");
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      console.log("email", email, "password", password);
      const response = await fetch(apiConfig.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.data));
        return data.data;
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState>) => {
      console.log("action.payload setuser", action.payload);
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;

      // Persist to localStorage
      localStorage.setItem("user", JSON.stringify(state));
    },
    logout: (state) => {
      state.id = null;
      state.name = "";
      state.email = "";
      state.role = "";
      state.token = "";
      state.isLoggedIn = false;
      state.error = null;
      state.isLoading = false;
      state.createdAt = null;
      state.updatedAt = null;

      // Remove from localStorage on logout
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<AuthState>) => {
          const { id, name, email, role, token, createdAt, updatedAt } =
            action.payload;
          state.id = id;
          state.name = name;
          state.email = email;
          state.role = role;
          state.token = token;
          state.isLoggedIn = true;
          state.isLoading = false;
          state.error = null;
          state.createdAt = createdAt;
          state.updatedAt = updatedAt;

          // Save user to localStorage
          localStorage.setItem("user", JSON.stringify(state));
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;
