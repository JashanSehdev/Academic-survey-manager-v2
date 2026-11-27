import { ICurrentUser } from "@/interfaces/auth/current-user.interface";
import { createSlice } from "@reduxjs/toolkit";
import { adminLoginAsync } from "./handle-auth/admin-auth.actions";
import { studentloginAsync } from "./handle-auth/student-auth.actions";
import { enqueueSnackbar } from "notistack";
import { getErrorMessage } from "@/utils/error-handler";
import axios from "axios";

interface InitialState {
  current_user: ICurrentUser | null;
  loading: boolean;
}

const initialState: InitialState = {
  current_user: null,
  loading: false,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(adminLoginAsync.fulfilled, (state, action) => {
        state.current_user = action.payload.data;
        state.loading = false;
      })
      .addCase(adminLoginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminLoginAsync.rejected, (state, action) => {
        if (axios.isAxiosError(action.payload)) {
          console.log(action.payload.status);
          if (action.payload.status === 400) {
            enqueueSnackbar(action.payload.response?.data);
          } else {
            enqueueSnackbar(getErrorMessage(Number(action.error.code)));
          }
        }

        state.loading = false;
      })
      .addCase(studentloginAsync.fulfilled, (state, action) => {
        state.current_user = action.payload.data;
        state.loading = false;
      })
      .addCase(studentloginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(studentloginAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
