import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getGuestShoppingCart,
  addingToCart,
  subtractingFromCart,
  deletingFromCart
} from '../store/guestShoppingCart'

class GuestShoppingCart extends Component {
  componentDidMount() {
    this.props.loadGuestShoppingCart()
    this.props.addToCart()
    this.props.subtractFromCart()
    this.props.deleteFromCart()
  }

  roundDecimal(num) {
    return Number(num).toFixed(2)
  }

  //Need to link to confirmation page!
  processOrder() {
    const products = this.props.products
    let total = products.map(x => Number(x.price * x.orderQuantity).toFixed(2))
    let cart = JSON.parse(localStorage.getItem('shoppingCart'))
    cart.map(product => (product.processed = true))
    localStorage.setItem('shoppingCart', JSON.stringify(cart))
  }

  render() {
    const products = this.props.products
    console.log('products-->', products)

    return (
      <div>
        <h1>Shopping Cart</h1>
        {products.length === 0 ? (
          <div>Shopping Cart Is Empty</div>
        ) : (
          <div>
            {products.map(product => (
              <div key={product.id}>
                <h4>{product.name}</h4>
                <img src={product.imageUrl} height="100" />
                <h4>Quantity: {product.orderQuantity}</h4>
                <h4>
                  Price: ${this.roundDecimal(
                    product.price * product.orderQuantity
                  )}
                </h4>
                <button
                  className="cartAddSubtractButton"
                  type="button"
                  onClick={() => this.props.addToCart(product.id)}
                >
                  +
                </button>
                <button
                  className="cartAddSubtractButton"
                  type="button"
                  onClick={() => this.props.subtractFromCart(product.id)}
                >
                  -
                </button>
                <button
                  type="button"
                  onClick={() => this.props.deleteFromCart(product.id)}
                >
                  Remove From Cart
                </button>
              </div>
            ))}
            {/* need to figure out how to render 'Shopping Cart Is Empty' if all products have been removed */}
            <div>
              {products === null ? (
                <div>Shopping Cart Is Empty</div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    console.log('checkout button clicked!')
                  }}
                >
                  Proceed To Checkout
                </button>
              )}
            </div>
          </div>
        )}
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
    },
    addToCart: productId => {
      dispatch(addingToCart(productId))
    },
    subtractFromCart: productId => {
      dispatch(subtractingFromCart(productId))
    },
    deleteFromCart: productId => {
      dispatch(deletingFromCart(productId))
    }
  }
}

export default connect(mapState, mapDispatch)(GuestShoppingCart)
