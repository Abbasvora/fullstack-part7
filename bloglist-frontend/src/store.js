import blogReducer from './reducers/blogReducer'
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    users: usersReducer,
  },
})

export default store
