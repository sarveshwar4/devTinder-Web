import React, { useEffect } from 'react'
import CardConnection from './CardConnection'
import axios from 'axios'
import BASE_URL from '../utils/constansts'
import { useDispatch, useSelector } from 'react-redux'
import { addUserRequest } from '../utils/requestviewSlice'

const Request = () => {
    const dispatch = useDispatch();
    const userRequest = useSelector((state)=>state.requestView);
    const upcomingrequestview=async()=>{
        try{
        const res = await axios.get(BASE_URL + "/user/request/recieved" , {withCredentials : true});
        dispatch(addUserRequest(res.data));
        }catch(error){
            console.error(error);
        }
    }
    useEffect(()=>{
       upcomingrequestview();
    }, [])
  return userRequest && (
    <div className=''>
    </div>
  )
}

export default Request;