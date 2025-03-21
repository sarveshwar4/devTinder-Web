import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Body from "./component/Body.jsx"; // Your main component
import Login from "./component/Login.jsx";
import { Provider } from "react-redux";
import appStore from "../src/utils/appStore.jsx";
import Profile from "./component/Profile.jsx";
import Feed from "./component/Feed.jsx";
import Connection from "./component/Connection.jsx";
import RequestRecieved from "./component/Request.jsx";
import Request from "./component/Request.jsx";
function App() {
  return (
    <Provider store={appStore}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
        <Route path="/" element={<Feed/>} />
          <Route path="login" element={<Login/>} />
          <Route path = "profile" element={<Profile/>} />
          <Route path="connection" element={<Connection/>}/>
          <Route path="request" element={<Request/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
