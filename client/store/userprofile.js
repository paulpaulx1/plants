import axios from 'axios'

const initialState = []

const SET_USER = 'SET_USER'

export const setUser = user => {
  return {type: 'SET_USER', user}
}

export const fetchUser = id => {
  return async dispatch => {
    try {
      const user = await axios.get(`/users/${id}`)
      dispatch(setUser(user.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function userProfile(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return action.user
    default:
      return state
  }
}
