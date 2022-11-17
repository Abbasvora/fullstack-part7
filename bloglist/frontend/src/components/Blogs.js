import React, { useEffect, useRef } from 'react'
import { createBlog, initilizeBlogs } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import NewBlog from './NewBlog'
import PropTypes from 'prop-types'
import Togleable from './Togleable'

export default function Blogs({ showNotification }) {
  let blogs = useSelector((state) => state.blogs)
  blogs = [...blogs].sort((a, b) => b.likes - a.likes)
  const user = useSelector((state) => state.user)
  const newBlogRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initilizeBlogs())
  }, [])

  const handleCreateBlog = (newBlog) => {
    dispatch(createBlog(user, newBlog))
    newBlogRef.current.toggleVisibility()
    showNotification(
      'success',
      `new blog ${newBlog.title} by ${newBlog.author} added.`,
    )
  }

  return (
    <>
      <Togleable buttonLabel="New Blog" ref={newBlogRef}>
        <NewBlog handleCreateBlog={handleCreateBlog} />
      </Togleable>

      <div className="grid font-medium text-lg justify-center grid-flow-row">
        {blogs.map((blog) => (
          <Link key={blog.id} to={`/blogs/${blog.id}`}>
            <div className="bg-white rounded mb-4 p-4 shadow-lg hover:translate-x-2 ease-linear duration-200">
              <p>{blog.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

Blogs.propTypes = {
  showNotification: PropTypes.func.isRequired,
}
