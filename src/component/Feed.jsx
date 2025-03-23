import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import BASE_URL from "../utils/constansts";

const Feed = () => {
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res?.data?.data));
      console.log(res.data)
    } catch (err) {
        // TODO HANDLE ERROR
      console.error("Error fetching feed:", err);
    }
  };
// as soon as page load we immidiate call getFeed() ovehere
  useEffect(() => {
    getFeed();
  }, []);
  return (
    <div className="flex justify-center my-[7%]">
      {feed.length > 0 ? <UserCard user={feed[0]} /> : <p>Loading feed...</p>}
    </div>
  );
};

export default Feed;
