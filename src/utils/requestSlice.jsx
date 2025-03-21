import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name : "requestView",
    initialState:null,
    reducers:{
        addUserRequest:(state, action)=>action.payload,
        remmoveUserRequest:(state, action)=>null,
    }
});
export const {addUserRequest, remmoveUserRequest}= requestSlice.actions;
export default requestSlice.reducer;