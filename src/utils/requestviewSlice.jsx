import { createSlice } from "@reduxjs/toolkit";

const requestviewSlice = createSlice({
    name : "requestView",
    initialState:null,
    reducers:{
        addUserRequest:(state, action)=>action.payload,
        remmoveUserRequest:(state, action)=>null,
    }
});
export const {addUserRequest, remmoveUserRequest}= requestviewSlice.actions;
export default requestviewSlice.reducer;