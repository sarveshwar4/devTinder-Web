import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const NavBar = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <div className="navbar bg-base-300 shadow-sm top-0 fixed px-10">
    <div className="flex-1">
      <Link to="/" className="btn btn-ghost text-xl">🧑‍💻devTinder</Link>
    </div>
    {user && <div className="flex gap-2">
      <p className='mt-2'>hii, {user.firstName}</p>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt="img"
              src= {user.photoUrl} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
          <li>
            <Link to="/profile" className="justify-between">
              Profile
              <span className="badge">New</span>
            </Link>
          </li>
          <li><a>Settings</a></li>
          <li><Link>Logout</Link></li>
        </ul>
      </div>
    </div>}
  </div>
  )
}

export default NavBar