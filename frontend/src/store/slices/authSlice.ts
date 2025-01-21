import { User } from "@/types/auth";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLogedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isLogedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (
      state,
      action: PayloadAction<{ user: User; accessToken: string }>
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isLogedIn = true;
    },
    clearAuthData: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isLogedIn = false;
    },
    updateUserInfo: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
  },
});

export const authSliceName = authSlice.name;
export const { setAuthData, clearAuthData, updateUserInfo } = authSlice.actions;
export default authSlice.reducer;

export const selectIsAuthenticated = (state: RootState) => state.auth.isLogedIn;
export const selectUser = (state: RootState) => state.auth.user;
