import React from 'react'
import EditProfile from './EditProfile';
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state)=>state.user);
  console.log("this is a user section",user)
  return user &&  (
      <EditProfile user = {user} />
  );
}

export default Profile