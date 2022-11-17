import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import Proptypes from 'prop-types'
import React from 'react'
import { loggoutUser } from '../reducers/userReducer'

export default function Header({ showNotification }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(loggoutUser())
    showNotification('success', 'Logout Successfull')
  }
  if (user) {
    return (
      <>
        <nav className="flex tracking-wider text-lg justify-start px-4 py-6 bg-slate-700 text-white font-medium">
          <Link
            to="/"
            className="mr-3  px-2 rounded hover:bg-white hover:text-slate-700"
          >
            Blogs
          </Link>
          <Link
            to="/users"
            className="px-2 rounded hover:bg-white hover:text-slate-700"
          >
            Users
          </Link>
          <div className="ml-auto">
            <span className="mr-1">{user.name} logged in</span>{' '}
            <button
              onClick={handleLogout}
              className="border-2 px-2 -pt-1 rounded hover:bg-white hover:text-slate-700"
            >
              Logout
            </button>
          </div>
        </nav>
        <div className="grid grid-flow-row justify-center">
          <h1 className="text-3xl tracking-wide font-bold text-zinc-700 my-9">
            Blogs
          </h1>
        </div>
        <p></p>
      </>
    )
  }
  return null
}

Header.propTypes = {
  showNotification: Proptypes.func.isRequired,
}
