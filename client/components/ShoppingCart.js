import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCart} from '../store/cart'

class ShoppingCart extends Component {
  componentDidMount() {
    this.props.loadShoppingCart(this.props.match.params.cartId)
  }

  render() {
    return <div>Shopping Cart</div>
  }
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    loadShoppingCart: id => {
      dispatch(fetchCart(id))
    }
  }
}

export default connect(mapState, mapDispatch)(ShoppingCart)
