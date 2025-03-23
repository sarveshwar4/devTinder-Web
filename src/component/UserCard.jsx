import React from 'react'
import BASE_URL from '../utils/constansts';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import axios from 'axios';


const UserCard = ({user}) => {
    const {_id , firstName, lastName, about, age, gender, photoUrl} = user;
    const dispatch = useDispatch();
    const userIntRestOrIgnore = async(status, userId)=>{
        try{
           const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true });
           dispatch(removeUserFromFeed(userId));
        }catch(error){
            console.log(error.message)
        }
    }
  return  (
    <div className="card bg-base-300 w-80 shadow-xl ">
  <figure>
    <img
      src={photoUrl}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName} </h2>
    {age && gender && <h2 className="card-title">{age + ", " + gender} </h2>}
    <p>{about}</p>
    <div className="card-actions justify-center my-3">
      <button className="btn btn-primary"  onClick={()=>userIntRestOrIgnore("ignored", _id)}>ignore</button>
      <button className="btn btn-secondary" onClick={()=>userIntRestOrIgnore("interested", _id)}>interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard