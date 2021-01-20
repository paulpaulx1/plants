import axios from 'axios'

const SET_PRODUCTS = 'SET_PRODUCTS'
const ADD_PRODUCTS = 'ADD_PRODUCTS'
const DELETE_PRODUCTS = 'DELETE_PRODUCTS'

export const setProducts = products => {
  return {
    type: SET_PRODUCTS,
    products
  }
}

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(setProducts(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const addingProduct = product => ({
  type: ADD_PRODUCTS,
  product
})

export const addProduct = product => {
  return async dispatch => {
    const created = await axios.post('/api/products', product)
    dispatch(addingProduct(created.data))
  }
}

export const deletingProduct = product => ({
  type: DELETE_PRODUCTS,
  product
})

export const deleteProduct = product => {
  return async dispatch => {
    await axios.delete(`/api/products/${product.id}`)
    dispatch(deletingProduct(product))
  }
}

//Sorts and filters
const SORT_BY_ALPHABET = 'SORT_BY_ALPHABET'
const SORT_BY_PRICE = 'SORT_BY_PRICE'
const FILTER_BY_PRICE = 'FILTER_BY_PRICE'
const FILTER_BY_VALUE = 'FILTER_BY_VALUE'

export const sortByPrice = products => ({
  type: SORT_BY_PRICE,
  products
})

export const filterByPrice = products => ({
  type: FILTER_BY_PRICE,
  products
})

export const sortByAlphabet = products => ({
  type: SORT_BY_ALPHABET,
  products
})

export const filterByValue = products => ({
  type: FILTER_BY_VALUE,
  products
})

const initialState = {
  all: []
}

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function allProductsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return {...state, all: action.products}
    case ADD_PRODUCTS:
      return {...state, all: [...state.all, action.product]}
    case DELETE_PRODUCTS:
      return {
        ...state,
        all: state.all.filter(product => product.id !== action.product.id)
      }
    case FILTER_BY_VALUE:
      return {...state, all: action.products}
    case SORT_BY_PRICE:
      return {...state, all: action.products}
    case SORT_BY_ALPHABET:
      return {...state, all: action.products}
    default:
      return state
  }
}
