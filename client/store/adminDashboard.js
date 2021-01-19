import axios from 'axios'

const DELETE_PRODUCT = 'DELETE_PRODUCT'

const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

const CREATE_PRODUCT = 'CREATE_PRODUCT'

export const deletingProduct = product => ({
  type: DELETE_PRODUCT,
  product
})

export const deleteProduct = product => {
  return async dispatch => {
    await axios.delete(`/api/products/${product.id}`)
    dispatch(deletingProduct(product))
  }
}

export const creatingProduct = product => {
  return {
    type: CREATE_PRODUCT,
    product
  }
}

export const createProduct = product => {
  return async dispatch => {
    const created = await axios.post('/api/products', product).data
    dispatch(creatingProduct(created))
    // history.push('/')
  }
}

export const updatingProduct = product => {
  return {
    type: UPDATE_PRODUCT,
    product
  }
}

export const updateProduct = product => {
  return async dispatch => {
    const updated = await axios.put(`/api/products/${product.id}`, product).data
    dispatch(updatingProduct(updated))
    console.log('updated', updated)
    // history.push('/')
  }
}

const initialState = {
  all: []
}

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PRODUCT:
      console.log('yoooooooo', action.product)
      return {
        ...state,
        all: state.all.map(
          product =>
            product.id === action.product.id ? action.product : product
        )
      }

    case CREATE_PRODUCT:
      return {...state, all: [...state.all, action.product]}

    case DELETE_PRODUCT:
      return {
        ...state,
        all: state.all.filter(product => product.id !== action.product.id)
      }
    default:
      return state
  }
}
