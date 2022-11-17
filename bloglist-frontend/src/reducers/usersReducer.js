import { createSlice } from '@reduxjs/toolkit'
import { getAll } from '../services/user'

const UsersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
  },
})
export const { setUsers } = UsersSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await getAll()
    dispatch(setUsers(users))
  }
}
export default UsersSlice.reducer
