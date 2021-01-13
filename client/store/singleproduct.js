import axios from 'axios'

const SET_PRODUCT = 'SET_PRODUCT'

export const setProduct = product => {
  return {type: 'SET_PRODUCT', product}
}

export const fetchProduct = id => {
  return async dispatch => {
    try {
      const product = await axios.get(`/api/products/${id}`)

      dispatch(setProduct(product.data))
    } catch (error) {
      console.error(error)
    }
  }
}

const initialState = {
  single: []
}

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return {...state, single: action.product}
    default:
      return state
  }
}
