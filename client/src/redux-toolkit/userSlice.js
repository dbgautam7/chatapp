import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    name: "",
    phoneOrEmail: "",
    gender: "",
    _id: "",
    isLoading: false,
    error: ""
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            const { name, phoneOrEmail, gender, _id } = action.payload || {};
            state.name = name || "";
            state.phoneOrEmail = phoneOrEmail || "";
            state.gender = gender || "";
            state._id = _id || "";
        },
        setLogoutUser:(state, action) => {
            // state.action = action.payload;
            state.name =  "";
            state.phoneOrEmail =  "";
            state.gender =  "";
            state._id =  "";
        }
    }
});


export const { setUserDetails,setLogoutUser } = userSlice.actions;
export default userSlice.reducer;