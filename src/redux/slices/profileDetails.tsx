import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        value: { username: "", userphoto: "" },
    },
    reducers: {
        profileType: (state, action) => {
            state.value = action.payload;
        },
    },
});
export const { profileType } = profileSlice.actions;

export default profileSlice.reducer;
