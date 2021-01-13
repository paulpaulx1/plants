import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import productReducer from './singleproduct'
import cartReducer from './cart'
import ProductsReducer from './allProducts'
import userProfile from './userprofile'

const reducer = combineReducers({
  user,
  productReducer,
  cartReducer,
  ProductsReducer,
  userProfile
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
