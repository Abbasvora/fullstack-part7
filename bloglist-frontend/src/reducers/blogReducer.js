import blogServices from '../services/blogs'
import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload,
      )
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id)
    },
    addComment(state, action) {
      state.map((blog) =>
        blog.id !== action.payload.id
          ? blog
          : blog.comments.push(action.payload.comment),
      )
    },
  },
})
export const { appendBlog, setBlogs, updateBlog, removeBlog, addComment } =
  blogSlice.actions

export const initilizeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogServices.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const updateLikes = (blog) => {
  return async (dispatch) => {
    const user = blog.user
    delete blog.user
    blog.likes += 1
    const result = await blogServices.put(blog)
    result.user = { ...user }
    dispatch(updateBlog(result))
  }
}

export const deleteBLog = (blog) => {
  return async (dispatch) => {
    await blogServices.deleteBlog(blog)
    dispatch(removeBlog(blog))
  }
}

export const createBlog = (user, blog) => {
  return async (dispatch) => {
    const result = await blogServices.create(blog)
    result.user = { username: user.username, name: user.name }
    dispatch(appendBlog(result))
  }
}

export default blogSlice.reducer
