import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userDataType } from "../interface/userDataType";

interface AuthState {
  userData: userDataType | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  userData: null,
  status: "idle",
  error: null,
};

// Async thunk to fetch user data
export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async ({ userId, password }: { userId: number; password: string }) => {
    try {
    } catch (error) {
      throw new Error("Failed to fetch user data");
    }
  }
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: (state) => {
      state.userData = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user data";
      });
  },
});
export const { resetState } = AuthSlice.actions;
export default AuthSlice.reducer;
