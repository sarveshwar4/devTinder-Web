import React, { useEffect } from 'react'
import BASE_URL from '../utils/constansts';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addConnections } from '../utils/connectionSlice';

const Connection = () => {
  const Userconnections = useSelector((state)=>state.connection);
  const dispatch = useDispatch();
  const fetchConnection = async() =>{
      try{
        const res = await axios.get(BASE_URL + "/user/connection/view",{withCredentials: true});
        dispatch(addConnections(res.data.data));
        console.log(res.data.data)
      }catch(error){
        console.log(error);
      }
  }
  useEffect(()=>{
    fetchConnection();
  }, []);
  if(!Userconnections) return null;
  if(Userconnections.length === 0) return (<h1>No Connections</h1>)
  return Userconnections && (
    <div className='my-[5%] text-center'>
        <h1 className='text-3xl font-bold text-white mb-2'>Connections</h1>
          {Userconnections.filter(connection => connection !== null).
          map((connection, key)=>{
            const {firstName, lastName, age, gender, about, photoUrl} = connection
              return(
              <div className=' rounded-lg w-1/2 m-4 flex p-4 mx-auto bg-base-200' key={key}>
                <div>
                <img alt="img" className='w-20 h-20 object-cover rounded-full' src={photoUrl}/>
                </div>
                <div className='text-left mx-6 flex flex-col '>
                <h1 className='text-xl font-bold'> {firstName + " " + lastName}</h1>
                <h1 className='mt-1'> {about}</h1>
                {age  && gender &&  <h1> {age  + ", " + gender}</h1>}
                </div>   
              </div>)
          })}
    </div>
  )
}

export default Connection