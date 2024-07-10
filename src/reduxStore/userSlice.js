import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    isAdmin: false,
    userData: {},
    isAdminEnabled: false,
    O_USER_ID : "",
    O_NAME : ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.isLoggedIn = action.payload
        },
        setUserId: (state, action) => {
            state.O_USER_ID = action.payload
        },
        setName: (state, action) => {
            state.O_NAME = action.payload
        },
        setUser: (state, action) => {
            state.userData = action.payload
        },
        setAdmin: (state, action) => {
            state.isAdmin = action.payload
        },
        enableAdmin: (state, action) => {
            state.isAdminEnabled = action.payload
        }
    }
})

export const { setLogin, setUser, setAdmin, enableAdmin, setUserId, setName } = userSlice.actions;
export default userSlice.reducer;