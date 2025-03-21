import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice"
import feedReducer from './feedSlice';
import requestviewReducer from './requestviewSlice';
import connectionReducer from './connectionSlice';
const appStore = configureStore({
    reducer: {
        // inside reducer we can add all the reducers
        user : userReducer,
        feed : feedReducer,
        requestView : requestviewReducer,
        connection : connectionReducer,
    }
});
export default appStore;