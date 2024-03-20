import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


const authSlice = createSlice({
        name:"Auth",
        initialState:{
            user:{}
        },
        reducers:{
            setLoggedInUser:(state, actions) => {
                state.user = actions.payload
                Cookies.set("jwtToken", actions.payload.token);
                Cookies.set("isAuthenticated", true);

            }
        },
});


export const { 
    setLoggedInUser

 } = authSlice.actions;

 export default authSlice.reducer

