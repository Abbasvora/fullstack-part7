import React, { useState } from 'react'
import { addComment, updateLikes } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

import blogServies from '../services/blogs'
import { deleteBLog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'

const Blog = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const blog = useSelector((state) =>
    state.blogs.filter((blog) => blog.id === id),
  )[0]
  const user = useSelector((state) => state.user)
  const [comment, setComment] = useState('')

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Remove Blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBLog(blog))
    }
  }

  const handleLikeUpdate = async (blog) => {
    const updateBlog = { ...blog }
    dispatch(updateLikes(updateBlog))
  }

  const handleCommentSubmit = async () => {
    const response = await blogServies.comment(blog.id, comment)
    console.log(response)
    dispatch(addComment({ id: blog.id, comment: response.comment }))
    setComment('')
  }

  if (!blog) {
    return null
  }

  return (
    <div className="flex justify-center align-middle">
      <div className="blogs bg-white py-5 px-7 rounded-md shadow-lg w-2/4">
        <h1 className="font-semibold"> {blog.title} </h1>
        <div className="details mt-4 mb-4">
          <div className=" flex justify-between mb-4">
            <p>
              <a
                href={blog.url}
                target="_blank"
                rel="noreferrer"
                className="border-2 mb-2 tracking-wider bg-gray-100 font-medium pb-[2px] px-2.5 border-gray-300 rounded hover:text-white hover:bg-zinc-700"
              >
                Read More
              </a>
            </p>
            <p>
              {blog.likes}
              <button
                onClick={() => handleLikeUpdate(blog)}
                className="like ml-1 border-2 tracking-wider bg-gray-100 font-medium px-2.5 border-gray-300 rounded hover:text-white hover:bg-zinc-700"
              >
                Like
              </button>
            </p>
          </div>
          <div className="flex justify-between">
            <p>
              Added by <span className="font-semibold">{blog?.user?.name}</span>
            </p>
            {blog?.user?.username !== user.username ? null : (
              <button
                onClick={() => handleDeleteBlog(blog)}
                className="border-2 tracking-wider bg-gray-100 font-medium px-2.5 border-gray-300 rounded hover:text-white hover:bg-zinc-700"
              >
                Remove
              </button>
            )}
          </div>
        </div>
        <hr />
        <div className="mt-2">
          <h3 className="font-medium mb-3">Comments</h3>
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            className="border-2 border-gray-300 bg-gray-100 rounded-md mr-4"
          />
          <button
            onClick={handleCommentSubmit}
            className="border-2 mb-2 tracking-wider bg-gray-100 font-medium px-2.5 border-gray-300 rounded hover:text-white hover:bg-zinc-700"
          >
            Comment
          </button>
          <ul className="mt-2">
            {blog.comments.map((comment, idx) => (
              <li key={idx} className="border-b-2 shadow">
                {comment}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
export default Blog
