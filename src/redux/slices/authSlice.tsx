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

export const initialState: AuthState = {
  id: null,
  name: "",
  email: "",
  role: "",
  token: "",
  number: "",
  linkedinUrl: "",
  githubUrl: "",
  profilePicture: "",
  isLoggedIn: false,
  error: null,
  isLoading: false,
  createdAt: null,
  updatedAt: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(apiConfig.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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
    setUser: (state, action: PayloadAction<AuthState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.linkedinUrl = action.payload.linkedinUrl;
      state.githubUrl = action.payload.githubUrl;
      state.number = action.payload.number;
      state.profilePicture = action.payload.profilePicture;
      state.isLoggedIn = true;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
    },
    logout: (state) => {
      state.id = null;
      state.name = "";
      state.email = "";
      state.role = "";
      state.token = "";
      state.githubUrl = "";
      (state.linkedinUrl = ""),
        (state.number = ""),
        (state.profilePicture = "");
      state.isLoggedIn = false;
      state.error = null;
      state.isLoading = false;
      state.createdAt = null;
      state.updatedAt = null;
      localStorage.clear();
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
          const {
            id,
            name,
            email,
            role,
            token,
            createdAt,
            updatedAt,
            number,
            linkedinUrl,
            githubUrl,
            profilePicture,
          } = action.payload;
          state.id = id;
          state.name = name;
          state.email = email;
          state.role = role;
          state.token = token;
          state.number = number;
          state.linkedinUrl = linkedinUrl;
          state.githubUrl = githubUrl;
          state.profilePicture = profilePicture;
          state.isLoggedIn = true;
          state.isLoading = false;
          state.error = null;
          state.createdAt = createdAt;
          state.updatedAt = updatedAt;
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
