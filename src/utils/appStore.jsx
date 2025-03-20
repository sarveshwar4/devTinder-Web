import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice"
import feedReducer from './feedSlice';
import requestviewSlice from './requestviewSlice';
const appStore = configureStore({
    reducer: {
        // inside reducer we can add all the reducers
        user : userReducer,
        feed : feedReducer,
        requestView : requestviewSlice,
    }
});
export default appStore;