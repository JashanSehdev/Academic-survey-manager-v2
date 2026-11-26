import { backend_api } from "@/api/api";
import { CreateSurveyInput } from "@/form/create-survey/create-survey.type";
import { BaseApiresponse } from "@/interfaces/api/response.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createSurveyAsync = createAsyncThunk <BaseApiresponse, CreateSurveyInput>(
    'survey/create',
    async(data, thunkApi) => {
        try{
            const responsse = await backend_api.post("surveys", data);
            return responsse.data

        } catch (error) {
            return thunkApi.rejectWithValue(error)
        }
    }
)