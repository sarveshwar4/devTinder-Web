import React from 'react'

const UserCard = ({user, hide}) => {
    const {firstName, lastName, about, age, gender, photoUrl} = user;
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
      <button className="btn btn-primary">ignore</button>
      <button className="btn btn-secondary">interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard