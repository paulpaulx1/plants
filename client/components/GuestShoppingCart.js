import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getGuestShoppingCart} from '../store/guestShoppingCart'

class GuestShoppingCart extends Component {
  componentDidMount() {
    this.props.loadGuestShoppingCart()
  }

  render() {
    const products = this.props.products
    return (
      <div>
        <h1>Shopping Cart</h1>
        <div>
          {products.map(product => {
            ;<div>NAME{product}</div>
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.guestShoppingCartReducer.cart
  }
}

const mapDispatch = dispatch => {
  return {
    loadGuestShoppingCart: () => {
      dispatch(getGuestShoppingCart())
    }
  }
}

export default connect(mapState, mapDispatch)(GuestShoppingCart)
