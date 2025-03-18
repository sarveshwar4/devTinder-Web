import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import BASE_URL from "../utils/constansts";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("nirmala@gmail.com");
  const [password, setPassword] = useState("Nirmala@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      Navigate("/");
    } catch (error) {
      setError(error?.response?.data);
      console.log(error);
    }
  };
  return (
    <div className="flex item-center justify-center mt-[10%]">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email:{email}</legend>
            <input
              type="text"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password:{password}</legend>
            <input
              type="text"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center mt-2">
            <button className="btn btn-primary" onClick={handleLogin}>
              Sumbit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
