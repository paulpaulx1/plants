import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import productReducer from './singleproduct'
import allProductsReducer from './allProducts'
import userProfile from './userprofile'
import orderHistoryReducer from './orderHistory'
import guestShoppingCartReducer from './guestShoppingCart'
import userShoppingCartReducer from './userShoppingCart'
import allUsers from './allUsers'
import dashboardReducer from './adminDashboard'

const reducer = combineReducers({
  user,
  productReducer,
  allProductsReducer,
  userProfile,
  orderHistoryReducer,
  guestShoppingCartReducer,
  allUsers,
  dashboardReducer
  userShoppingCartReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
