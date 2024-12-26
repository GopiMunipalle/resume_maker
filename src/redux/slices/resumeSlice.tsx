import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Resume } from "../../utlis/types/commonTypes";
import { apiConfig } from "../../config/apiConfig";

export interface initialData {
  id: number;
  name: string;
  email: string;
  number?: string;
  linkedIn?: string;
  gitbuLink?: string;
  resumes: Resume[];
}

const initialState: initialData = {
  id: 0,
  name: "",
  email: "",
  number: "",
  linkedIn: "",
  gitbuLink: "",
  resumes: [],
};

export const resumesData = createAsyncThunk(
  "resume/getAllResumes",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await fetch(apiConfig.allResumes, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const data = await response.json();
      return data[0];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const resumeSlice = createSlice({
  name: "resume",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        resumesData.fulfilled,
        (state, action: PayloadAction<initialData>) => {
          state.email = action.payload.email;
          state.gitbuLink = action.payload.gitbuLink;
          state.id = action.payload.id;
          state.name = action.payload.name;
          state.number = action.payload.number;
          state.resumes = action.payload.resumes;
        }
      )
      .addCase(resumesData.rejected, (state) => {
        console.log(state, "error while getting all resumes data");
      });
  },
});

export default resumeSlice.reducer;
