import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser() {
      return null
    },
  },
})

export const { setUser, removeUser } = userSlice.actions

export const loggoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('blogsLoggedInUser')
    dispatch(removeUser())
  }
}

export default userSlice.reducer
