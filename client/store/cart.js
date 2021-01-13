import axios from 'axios'

const SET_SHOPPING_CART = 'SET_SHOPPING_CART'

export const setCart = cart => {
  return {
    type: SET_SHOPPING_CART,
    cart
  }
}

export const fetchCart = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/cart/${id}`)
      dispatch(setCart(data))
    } catch (err) {
      console.error(err)
    }
  }
}

const initialState = {
  cart: []
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SHOPPING_CART:
      return {...state, cart: action.cart}
    default:
      return state
  }
}
