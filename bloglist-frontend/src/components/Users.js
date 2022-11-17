import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import { initializeUsers } from '../reducers/usersReducer'

function Users() {
  const dispatch = useDispatch()
  let users = useSelector((state) => state.users)
  users = [...users].sort((a, b) => b.blogs.length - a.blogs.length)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])
  return (
    <div className="grid grid-flow-row justify-center">
      <h1 className="text-center font-bold text-2xl mb-4">Users</h1>

      <div className="grid grid-flow-row ">
        {users.map((user) => (
          <Link key={user.id} to={`/users/${user.id}`}>
            <div className="grid justify-between w-80 grid-flow-col bg-white rounded mb-4 p-4 shadow-lg hover:translate-x-2 ease-linear duration-200">
              <p>{user.name}</p>
              <p>Blogs {user.blogs.length}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Users
