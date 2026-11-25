import { backend_api } from "@/api/api";
import { StudentLoginInput } from "@/form/student-login-form/student-login.type";
import { ApiResponse } from "@/interfaces/api/response.interface";
import { ICurrentUser } from "@/interfaces/auth/current-user.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const studentloginAsync = createAsyncThunk <ApiResponse<ICurrentUser>, StudentLoginInput>(
    'auth/student-login',
    async( data, thunkApi) => {
        try{
            await backend_api.post("/auth/login/student", data);

            const user_data = await backend_api.get("/auth/me");

            return user_data.data;
            
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)