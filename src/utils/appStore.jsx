import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice"
const appStore = configureStore({
    reducer: {
        // inside reducer we can add all the reducers
        user : userReducer,
    }
});
export default appStore;