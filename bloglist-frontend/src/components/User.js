import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function User() {
  const { id } = useParams()
  const user = useSelector((state) =>
    state.users.filter((user) => user.id === id),
  )[0]
  if (!user) {
    return null
  }
  return (
    <div className="grid grid-flow-row justify-center">
      <h1 className="font-bold text-2xl mb-4">{user.name}</h1>
      <h3 className="font-medium text-xl mb-1.5">Added Blogs</h3>

      <div className=" font-medium text-lg">
        {user.blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded mb-4 p-4 shadow-lg hover:translate-x-2 ease-linear duration-200"
          >
            <p> {blog.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default User
