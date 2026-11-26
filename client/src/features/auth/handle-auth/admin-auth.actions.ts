import { backend_api } from "@/api/api";
import { AdminLoginInput } from "@/form/admin-login-form/login-form.type";
import { DispatchRegistrationCreadentials } from "@/form/admin-registration-form/admin-registration-form.type";
import { ApiResponse } from "@/interfaces/api/response.interface";
import { ICurrentUser } from "@/interfaces/auth/current-user.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const adminLoginAsync = createAsyncThunk <ApiResponse<ICurrentUser>, AdminLoginInput>(
    'auth/admin-login',
    async( data, thunkApi) => {
        try{
            await backend_api.post("/auth/login/admin", data);

            const user_data = await backend_api.get("/auth/me");

            return user_data.data;
            
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const adminRegisterAsync = createAsyncThunk <ApiResponse<ICurrentUser>, DispatchRegistrationCreadentials>(
    'auth/admin-login',
    async( data, thunkApi) => {
        try{
            await backend_api.post("/auth/register", data);

            const user_data = await backend_api.get("/auth/me");

            return user_data.data;
            
        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)