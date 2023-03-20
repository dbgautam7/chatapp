import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    name: "",
    phoneOrEmail: "",
    gender: "",
    _id: "",
    photo:"",
    isLoading: false,
    error: ""
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            const { name, phoneOrEmail, gender, _id,photo } = action.payload || {};
            state.name = name || "";
            state.phoneOrEmail = phoneOrEmail || "";
            state.gender = gender || "";
            state._id = _id || "";
            state.photo=photo || "";
        },
        setLogoutUser:(state) => {
            state.name =  "";
            state.phoneOrEmail =  "";
            state.gender =  "";
            state._id =  "";
            state.photo="";
        }
    }
});


export const { setUserDetails,setLogoutUser } = userSlice.actions;
export default userSlice.reducer;