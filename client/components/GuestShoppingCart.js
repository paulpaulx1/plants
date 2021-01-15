import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getGuestShoppingCart} from '../store/guestShoppingCart'

class GuestShoppingCart extends Component {
  componentDidMount() {
    this.props.loadGuestShoppingCart()
  }

  render() {
    let styleObj = {fontSize: '18px'}
    const products = this.props.products
    if (products) {
      return (
        <header className="flex-cart">
          <span>
            <div>
              <h1>Shopping Cart</h1>

              {products.map(product => (
                <div key={product.id}>
                  <h4>{product.name}</h4>
                  <img src={product.imageUrl} height="160" />
                  <h4>Quantity: {product.orderQuantity}</h4>
                  {/* Need to fix rounding of cents */}
                  <h4>
                    Price: {(product.price * product.orderQuantity).toFixed(2)}
                  </h4>
                </div>
              ))}
            </div>
          </span>
        </header>
      )
    } else {
      return <div>Nothing in cart</div>
    }
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
