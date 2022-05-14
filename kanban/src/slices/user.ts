import { createSlice } from "@reduxjs/toolkit";
import { LS_USER } from "../constants/localStorage";

const initialState = {
    user: localStorage.getItem(LS_USER) ? JSON.parse(localStorage.getItem(LS_USER)!) : {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
            localStorage.setItem(LS_USER, JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.user = {}
            localStorage.removeItem(LS_USER)
        }
    },
})

export const { login, logout } = userSlice.actions
export default userSlice
