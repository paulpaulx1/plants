/* eslint-disable no-alert */
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
import Paper from '@material-ui/core/Paper'
// import { loadStripe } from "@stripe/stripe-js";

// const stripe = require('stripe')(process.env.STRIPE_SECRET)
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
    let total
    if (this.props.products) {
      total = this.props.products
        .reduce(
          (acc, product) => acc + product.price * product.orderQuantity,
          0
        )
        .toFixed(2)
    }
    const stripe = window.Stripe(
      'pk_test_51I9W62HLAzF5yr08seh8CF44Fn7e7AR2Tq5oAvojPspQij7C6ET5rL9Z7cFHs87aHSVtf4NBqq3HdXaxja1lNYmv008pX9cYsU'
    )

    return (
      <>
        <h1 style={{textAlign: 'center'}}>shopping cart</h1>
        <Paper style={{display: 'flex', justifyContent: 'center'}}>
          {!products ? (
            <div>Shopping Cart Is Empty</div>
          ) : (
            <div>
              {products.map(product => (
                <Paper key={product.id} className="cartitem">
                  <h4>{product.name}</h4>
                  <img src={product.imageUrl} height="220" />
                  <h4>Quantity: {product.orderQuantity}</h4>
                  <h4>Price: ${this.roundDecimal(product.price)}</h4>

                  <button
                    className="addtocart"
                    style={{
                      background: 'transparent',
                      padding: '1em'
                    }}
                    type="button"
                    onClick={() => this.addToCart(product.id)}
                  >
                    +
                  </button>
                  <button
                    className="addtocart"
                    type="button"
                    style={{
                      background: 'transparent',
                      padding: '1em'
                    }}
                    onClick={() => this.subtractFromCart(product.id)}
                  >
                    -
                  </button>

                  <button
                    className="addtocart"
                    style={{
                      background: 'transparent',
                      padding: '1em'
                    }}
                    type="button"
                    onClick={() => this.deleteFromCart(product.id)}
                  >
                    remove from cart
                  </button>
                </Paper>
              ))}
              <div>
                {products === null ? (
                  <div>
                    <div>buy some stuff</div>
                  </div>
                ) : (
                  <div>
                    <br />
                    <div>total: ${total}</div>
                    <button
                      className="addtocart"
                      style={{
                        background: 'transparent',
                        padding: '1em'
                      }}
                      type="submit"
                      onClick={() =>
                        fetch('/createcheckoutsession', {
                          method: 'POST'
                        })
                          .then(function(response) {
                            console.log(response)
                            return response.json()
                          })
                          .then(function(session) {
                            console.log(session)
                            return stripe.redirectToCheckout({
                              sessionId: session.id
                            })
                          })
                          .then(function(result) {
                            // If redirectToCheckout fails due to a browser or network
                            // error, you should display the localized error message to your
                            // customer using error.message.
                            if (result.error) {
                              alert(result.error.message)
                            }
                          })
                          .catch(function(error) {
                            console.error('Error:', error)
                          })
                      }
                    >
                      place order
                    </button>
                    {/* </Link> */}
                  </div>
                )}
              </div>
            </div>
          )}
        </Paper>
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
