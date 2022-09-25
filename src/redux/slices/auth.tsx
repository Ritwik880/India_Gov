import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        value: {
            authFlow: "",
            isLoggedin: false,
            emailValue: "",
            phoneValue: "",
        },
    },
    reducers: {
        authType: (state, action) => {
            state.value = action.payload;
        },
    },
});
export const { authType } = authSlice.actions;

export default authSlice.reducer;
