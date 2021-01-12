import axios from 'axios'

const initialState = {}

const SET_PRODUCT = 'SET_PRODUCT'

export const setProduct = product => {
  return {type: 'SET_PRODUCT', product}
}

export const fetchProduct = id => {
  return async dispatch => {
    try {
      const product = await axios.get(`/beer/${id}`)

      dispatch(setProduct(product.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product
    default:
      return state
  }
}
