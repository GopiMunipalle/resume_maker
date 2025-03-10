import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiConfig } from "../../config/apiConfig";

export interface AuthState {
  id: string | null;
  name: string;
  email: string;
  number: string;
  linkedinUrl: string;
  githubUrl: string;
  profilePicture: string;
  role: string;
  token: string;
  isLoggedIn: boolean;
  error: string | null;
  isLoading: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface authSliceState {
  loading: boolean;
  userInfo: any | null;
  userToken: any | null;
  error: null | any;
  success: boolean;
}

export const initialState: authSliceState = {
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
  success: false,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, otp }: { email: string; otp: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(apiConfig.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (response.ok) {
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
    logout: (state) => {
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
    setCredentials: (state, action) => {
      const { userInfo } = action.payload;
      state.userInfo = userInfo;
      console.log("userInfo", userInfo);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<AuthState>) => {
          const { payload } = action;
          state.loading = false;
          state.userInfo = payload;
          state.userToken = payload.token;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = String(action.payload);
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;
