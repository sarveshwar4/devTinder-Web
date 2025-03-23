import React, { useEffect } from 'react'
import axios from 'axios'
import BASE_URL from '../utils/constansts'
import { useDispatch, useSelector } from 'react-redux'
import { addUserRequest, removeUserRequest } from '../utils/requestSlice'

const Request = () => {
    const dispatch = useDispatch();
    const Requests = useSelector((state)=>state.requests);
    const fetchRequest=async()=>{
        try{
        const res = await axios.get(BASE_URL + "/user/request/recieved" , {withCredentials : true});
        dispatch(addUserRequest(res.data));
        }catch(error){
            console.error(error);
        }
    }
    const requestReview = async(status, _id)=>{
      try{
      const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, {withCredentials : true});
      dispatch(removeUserRequest(_id));
      }catch(error){
        console.log(error);
      }
    }
    useEffect(()=>{
      fetchRequest();
    }, []);
    if(!Requests) return;
    if(Requests.length == 0) return (<h1 className='text-center mt-[10%] text-zinc-700 text-3xl'>No Request Found</h1>)
  return (
   <div className='my-[5%] text-center flex flex-col justify-between items-center'>
    <h1 className='text-3xl font-bold text-white mb-2'>Upcoming Requests</h1>
      {Requests.map((Request, key)=>{
        const {_id, firstName, lastName, age, gender, about, photoUrl} = Request.fromUserId
          return(
          <div className=' rounded-lg w-1/2 m-4 flex p-4 mx-auto bg-base-200' key={_id}>
            <div>
            <img alt="img" className='w-20 h-20 object-cover rounded-full' src={photoUrl}/>
            </div>
            <div className='text-left mx-6 flex flex-col mt-2'>
            <h1 className='text-xl font-bold'> {firstName + " " + lastName}</h1>
            <h1 className='mt-1'> {about}</h1>
            {age  && gender &&  <h1> {age  + ", " + gender}</h1>}
            </div>   
            <div className="card-actions justify-end my-3 ml-[30%]">
          <button className="btn btn-primary" onClick={()=>requestReview("accepted", Request._id)}>accepted</button>
           <button className="btn btn-secondary ml-2">rejected</button>
           </div>
           </div>
          )
      })}
</div>

  )
}

export default Request;