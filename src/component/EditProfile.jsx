import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import BASE_URL from "../utils/constansts";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const EditProfile = ({ user }) => {  
  const [firstName, setFirstname] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age?user.age: "");
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const dispatch = useDispatch();
  const updateProfile = async() =>{
    try{
        const res = axios.patch(BASE_URL + "/profile/edit",{
           firstName,
           lastName,
           age,
           gender,
           photoUrl,
           about
        }, { withCredentials: true });
        dispatch(addUser(res));
    }catch(error){
        console.error(error.message);
    }
  }
  return user && (
    <div className="flex justify-center gap-x-4 my-[6%] ">

      <div className="flex item-center justify-center ">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">FirstName:{firstName}</legend>
              <input
                type="text"
                className="input"
                value={firstName}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">lastName:{lastName}</legend>
              <input
                type="text"
                className="input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">photoUrl:</legend>
              <input
                type="text"
                className="input"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">age:{age}</legend>
              <input
                type="text"
                className="input"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">gender:{gender}</legend>
              <input
                type="text"
                className="input"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">about:{about}</legend>
              <input
                type="text"
                className="input"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </fieldset>

            <p className="text-red-500"></p>
            <div className="card-actions justify-center mt-2">
              <button className="btn btn-primary" onClick={updateProfile}>Sumbit</button>
            </div>
          </div>
        </div>
      </div>

      <div className="ml-36">
        <UserCard
          user={{ firstName, lastName, age, gender, photoUrl, about }}
        />
      </div>

    </div>
  );
};

export default EditProfile;
