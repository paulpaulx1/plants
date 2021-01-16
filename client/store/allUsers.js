import axios from 'axios'
import history from '../history'

const SET_USERS = 'SET_USERS'

export const setUsers = users => {
  return {
    type: SET_USERS,
    users
  }
}

export const fetchUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/users')
      dispatch(setUsers(data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  user: []
}

/**
 * REDUCER
 */
export default function allUsers(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return {...state, user: action.users}
    default:
      return state
  }
}
