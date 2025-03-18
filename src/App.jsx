import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Body from "./component/Body.jsx"; // Your main component
import Login from "./component/Login.jsx";
import { Provider } from "react-redux";
import appStore from "../src/utils/appStore.jsx";
import Profile from "./component/Profile.jsx";
function App() {
  return (
    <Provider store={appStore}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
        <Route path="/" element={<h1>this is a feed section</h1>} />
          <Route path="login" element={<Login/>} />
          <Route path = "profile" element={<Profile/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
