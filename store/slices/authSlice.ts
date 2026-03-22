import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, AuthUser } from "@/types";

const STORAGE_KEY = "rm_auth_user";

// ─── Thunks ───────────────────────────────────────────────────────────────────

export const loginUser = createAsyncThunk<
  AuthUser,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  const res = await fetch("/api/auth", {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) return rejectWithValue(data.error ?? "Login failed.");

  // Persist to localStorage so session survives refresh
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data.user));
  }
  return data.user as AuthUser;
});

// ─── Initial state ────────────────────────────────────────────────────────────

const initialState: AuthState = {
  user:      null,
  isLoading: false,
  error:     null,
};

// ─── Slice ────────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Hydrate session from localStorage on app boot
    hydrateAuth(state) {
      if (typeof window === "undefined") return;
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) state.user = JSON.parse(stored) as AuthUser;
      } catch {
        state.user = null;
      }
    },

    logout(state) {
      state.user  = null;
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEY);
      }
    },

    clearAuthError(state) {
      state.error = null;
    },

    // Allow direct user injection (e.g. from server-side props)
    setUser(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error     = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user      = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error     = action.payload ?? "Login failed.";
      });
  },
});

export const { hydrateAuth, logout, clearAuthError, setUser } = authSlice.actions;
export default authSlice.reducer;
