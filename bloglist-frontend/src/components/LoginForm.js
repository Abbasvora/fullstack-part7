import React, { useState } from 'react'

import PropTypes from 'prop-types'
import blogServices from '../services/blogs'
import { login } from '../services/login'
import { setUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const LoginForm = ({ showNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const userData = await login({ username, password })
      dispatch(setUser(userData))
      blogServices.setToken(userData.token)
      window.localStorage.setItem('blogsLoggedInUser', JSON.stringify(userData))
      showNotification('success', `Welcome ${userData.name}`)
    } catch (error) {
      console.log(error)
      showNotification('error', 'Wrong Credentials')
    } finally {
      setPassword('')
      setUsername('')
    }
  }

  return (
    <div className="flex min-h-screen justify-center items-center flex-col">
      <div className="rounded-md bg-white border-solid border-2  shadow-lg p-5">
        <h2 className="text-center mb-4 font-medium text-lg">
          Login to application
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-3">
            <div className="flex flex-row space-x-2 mx-auto mb-4">
              <p className="">Username</p>
              <input
                type={'text'}
                id="username"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                className="border-2  rounded-md border-gray-300 bg-gray-100"
              />
            </div>
            <div className="flex flex-row space-x-2 mx-auto">
              <p className="mr-1">Password</p>
              <input
                type={'password'}
                id="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                className="border-2 border-gray-300 bg-gray-100 rounded-md"
              />
            </div>
          </div>
          <button
            type="submit"
            className="border-2 tracking-wider bg-gray-100 font-medium px-2.5 border-gray-300 rounded hover:text-white hover:bg-zinc-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

LoginForm.propTypes = {
  showNotification: PropTypes.func.isRequired,
}

export default LoginForm
