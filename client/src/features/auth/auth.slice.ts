import { ICurrentUser } from "@/interfaces/auth/current-user.interface";
import { createSlice } from "@reduxjs/toolkit";


interface InitialState {
    user : ICurrentUser | null
}

const initialState : InitialState = {
    user : null
}

const authSlice = createSlice({
    name : 'authSlice',
    initialState,
    reducers : {}
})


export default authSlice.reducer