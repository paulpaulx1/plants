import axios from 'axios'

const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY'

const retrieveOrderHistory = orders => ({
  type: GET_ORDER_HISTORY,
  orders
})

export const getOrderHistory = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/orderHistory`)
      dispatch(retrieveOrderHistory(data))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = {
  history: []
}

export default function orderHistoryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_HISTORY:
      return {...state, history: action.orders}
    default:
      return state
  }
}
