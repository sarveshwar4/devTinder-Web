import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import BASE_URL from "../utils/constansts";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
const body = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const Navigate = useNavigate();
  const fetchUser = async () => {
    if (user) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401){
        Navigate("/login");
      }
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default body;
