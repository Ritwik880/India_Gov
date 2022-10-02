import { createSlice } from '@reduxjs/toolkit';

export const profileViewSlice = createSlice({
    name: 'profileView',
    initialState: {
        value: {
            isLoggedin: false,
            userId: "",
            applicationId: "",


        },
    },
    reducers: {
        profileView: (state, action) => {
            state.value = action.payload;
        },
    },
});
export const { profileView } = profileViewSlice.actions;

export default profileViewSlice.reducer;
