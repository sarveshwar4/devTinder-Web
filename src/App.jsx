import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Body from "./Body.jsx"; // Your main component
import Login from "./Login.jsx";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/body" element={<Body />}>
          <Route path="login" element={<Login/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
