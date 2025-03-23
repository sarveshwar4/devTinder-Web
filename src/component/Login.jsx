import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import BASE_URL from "../utils/constansts";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setlastName] = useState("");
  const[loggedInUser, setLoggedinUser] = useState(true);
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
  
  const handleSignUp = async()=>{
   try {
    const res = await axios.post(BASE_URL + "/signUp", {
       firstName,
       lastName,
       email,
       password
    },
    {withCredentials : true},);
    Navigate("/profile");
    dispatch(addUser(res.data.data))
    console.log(res);
  }catch(error){
    console.log(error);
  }
  }
  return (
    // <div className="flex item-center justify-center mt-[10%]">
    //   <div className="card bg-base-300 w-96 shadow-sm">
    //     <div className="card-body">
    //       <h2 className="card-title justify-center">Login</h2>
    //       <fieldset className="fieldset">
    //         <legend className="fieldset-legend">Email:{email}</legend>
    //         <input
    //           type="text"
    //           className="input"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //       </fieldset>
    //       <fieldset className="fieldset">
    //         <legend className="fieldset-legend">Password:{password}</legend>
    //         <input
    //           type="text"
    //           className="input"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //       </fieldset>
    //       <p className="text-red-500">{error}</p>
    //       <div className="card-actions justify-center mt-2">
    //         <button className="btn btn-primary" onClick={handleLogin}>
    //           Sumbit
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="flex items-center justify-center mt-[10%]">
  <div className=" w-96 shadow-md rounded-lg p-6 bg-base-200">
    <h2 className="text-center text-xl font-bold mb-4">{loggedInUser ? "Login" : "signUp"}</h2>

    {!loggedInUser && <><div className="mb-3">
      <label className="block font-semibold mb-1">FirstName</label>
      <input
        type="text"
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={firstName}
        onChange={(e) => setFirstname(e.target.value)}
      />
    </div>

    <div className="mb-3">
      <label className="block font-semibold mb-1">lastName</label>
      <input
        type="text"
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={lastName}
        onChange={(e) => setlastName(e.target.value)}
      />
    </div> </>}

    <div className="mb-3">
      <label className="block font-semibold mb-1">Email</label>
      <input
        type="text"
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <div className="mb-3">
      <label className="block font-semibold mb-1">Password</label>
      <input
        type="password"
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <p className="text-red-500">{error}</p>

    <div className="flex justify-center mt-[10%]">
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={loggedInUser ? handleLogin : handleSignUp}>
        Submit
      </button>
    </div>
    <div className="flex text-center cursor-pointer" onClick={()=>setLoggedinUser((loggedInUser)=>!loggedInUser)}>
      <p className="mt-4  text-zinc-200" >
      {loggedInUser  ? "Don't have an account?" : "have an account?" }</p>
      <span className="text-blue-400 mt-4 ml-1">{loggedInUser ? "signUp" : "logIn"}</span>
    </div>
  </div>
</div>

  );
};

export default Login;
