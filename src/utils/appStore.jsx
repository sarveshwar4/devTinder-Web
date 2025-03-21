import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice"
import feedReducer from './feedSlice';
import requestReducer from './requestSlice';
import connectionReducer from './connectionSlice';
const appStore = configureStore({
    reducer: {
        // inside reducer we can add all the reducers
        user : userReducer,
        feed : feedReducer,
        requests : requestReducer,
        connection : connectionReducer,
    }
});
export default appStore;