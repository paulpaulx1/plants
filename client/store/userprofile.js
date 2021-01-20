import axios from 'axios'

const SET_USER = 'SET_USER'

export const setUser = user => {
  return {type: 'SET_USER', user}
}

export const fetchUser = id => {
  return async dispatch => {
    try {
      const user = await axios.get(`/api/users/${id}`)

      dispatch(setUser(user.data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  user: []
}

export default function userProfile(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {...state, user: action.user}
    default:
      return state
  }
}
