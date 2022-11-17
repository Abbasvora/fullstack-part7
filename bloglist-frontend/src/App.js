import Notification from './components/Notification'
import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import Blogs from './components/Blogs'
import Header from './components/Header'
import LoginForm from './components/LoginForm'
import User from './components/User'
import Users from './components/Users'
import blogService from './services/blogs'
import { setUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const userData = JSON.parse(
      window.localStorage.getItem('blogsLoggedInUser'),
    )
    if (userData) {
      dispatch(setUser(userData))
      blogService.setToken(userData.token)
    }
  }, [])

  const showNotification = (classname, message) => {
    setNotification({ classname: classname, message })

    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  return (
    <div>
      {notification === null ? null : (
        <Notification notification={notification} />
      )}
      <Header showNotification={showNotification} />
      <Routes>
        <Route
          path="/"
          element={
            user === null ? (
              <LoginForm showNotification={showNotification} />
            ) : (
              <Blogs showNotification={showNotification} />
            )
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  )
}

export default App
