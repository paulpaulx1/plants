import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  getGuestShoppingCart,
  addingToCart,
  subtractingFromCart,
  deletingFromCart,
  guestCartCheckout
} from '../store/guestShoppingCart'

class GuestShoppingCart extends Component {
  constructor(props) {
    super(props)
    this.guestCartCheckout = this.guestCartCheckout.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.subtractFromCart = this.subtractFromCart.bind(this)
    this.deleteFromCart = this.deleteFromCart.bind(this)
  }
  componentDidMount() {
    this.props.loadGuestShoppingCart()
  }

  guestCartCheckout() {
    this.props.guestCartCheckout()
  }
  addToCart(event) {
    this.props.addToCart(event)
  }
  subtractFromCart(event) {
    this.props.subtractFromCart(event)
  }
  deleteFromCart(event) {
    this.props.deleteFromCart(event)
  }

  roundDecimal(num) {
    return Number(num).toFixed(2)
  }

  render() {
    const products = this.props.products

    let total = products
      .reduce((acc, product) => acc + product.price * product.orderQuantity, 0)
      .toFixed(2)

    return (
      <>
        <h1>Shopping Cart</h1>
        <div>
          {products.length === 0 ? (
            <div>Shopping Cart Is Empty</div>
          ) : (
            <div className="flex-cart" id="checkoutDiv">
              {products.map(product => (
                <div key={product.id}>
                  <h4>{product.name}</h4>
                  <img src={product.imageUrl} height="185" />
                  <h4>Quantity: {product.orderQuantity}</h4>
                  <h4>
                    Price: $
                    {this.roundDecimal(product.price)}
                  </h4>

                  <button
                    className="cartAddSubtractButton"
                    type="button"
                    onClick={() => this.addToCart(product.id)}
                  >
                    +
                  </button>
                  <button
                    className="cartAddSubtractButton"
                    type="button"
                    onClick={() => this.subtractFromCart(product.id)}
                  >
                    -
                  </button>

                  <button
                    className="cartAddSubtractButton"
                    type="button"
                    onClick={() => this.deleteFromCart(product.id)}
                  >
                    Remove From Cart
                  </button>
                </div>
              ))}
              <div id="thisguy">
                {products === null ? (
                  <div>
                    <div>Shopping Cart Is Empty</div>
                  </div>
                ) : (
                  <div id="checkoutDiv">
                    <div id="checkoutDiv">TOTAL: ${total}</div>
                    <Link to="/orderconfirmation">
                      <button
                        id="checkoutButton"
                        type="submit"
                        onClick={() => this.guestCartCheckout()}
                      >
                        Place Your Order
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </>
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
    },
    guestCartCheckout: () => dispatch(guestCartCheckout())
  }
}

export default connect(mapState, mapDispatch)(GuestShoppingCart)
