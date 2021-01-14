const SET_GUEST_SHOPPING_CART = 'SET_GUEST_SHOPPING_CART'
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'

// const ADD_PRODUCT = 'ADD_PRODUCT'
// const SUBTRACT_PRODUCT = 'SUBTRACT_PRODUCT'
// const DELETE_PRODUCT = 'DELETE_PRODUCT'

export const setGuestShoppingCart = products => ({
  type: SET_GUEST_SHOPPING_CART,
  products
})

export const addProductToCart = guestCart => ({
  type: ADD_PRODUCT_TO_CART,
  guestCart
})

export const getGuestShoppingCart = () => {
  return async dispatch => {
    try {
      const products = await JSON.parse(localStorage.getItem('shoppingCart'))
      dispatch(setGuestShoppingCart(products))
    } catch (err) {
      console.log(err)
    }
  }
}

export const addingToShoppingCart = product => {
  console.log('product ----->', product)
  console.log('localstorage ---->', localStorage)
  return dispatch => {
    try {
      let cart = JSON.parse(localStorage.getItem('shoppingCart'))
      if (cart) {
        const productArray = [...cart].map(item => item.id)
        if (!productArray.includes(product.id)) product.orderQuantity++
        cart.push({...product})
        // cart.product.orderQuantity++
      } else {
        cart = []
        // product.orderQuantity++
        cart.push({...product})
        // cart.product.orderQuantity++
      }
      localStorage.setItem('shoppingCart', JSON.stringify(cart))
      dispatch(addProductToCart(cart))
      // localStorage.clear()
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = {
  cart: []
}

export default function guestShoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GUEST_SHOPPING_CART:
      return {...state, cart: action.products}
    case ADD_PRODUCT_TO_CART:
      return {...state, cart: action.guestCart}
    default:
      return state
  }
}
