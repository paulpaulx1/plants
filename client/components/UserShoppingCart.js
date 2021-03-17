import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  getUserShoppingCart,
  addingToUserCart,
  subtractingFromUserCart,
  deletingFromUserCart,
  userCartCheckout
} from '../store/userShoppingCart'
import Paper from '@material-ui/core/Paper'

class UserShoppingCart extends Component {
  componentDidMount() {
    this.props.loadUserShoppingCart(this.props.match.params.id)
  }

  roundDecimal(num) {
    return Number(num).toFixed(2)
  }

  render() {
    const products = this.props.products
    const userId = this.props.match.params.id

    let total = products
      .reduce(function(acc, product) {
        return acc + product.price * product.Orders[0].OrderHistory.quantity
      }, 0)
      .toFixed(2)

    return (
      <div>
        <h1 style={{textAlign: 'center'}}>shopping cart</h1>
        <div />
        {products.length === 0 ? (
          <div>Shopping Cart Is Empty</div>
        ) : (
          <Paper style={{display: 'flex', justifyContent: 'center'}}>
            {products.map(product => (
              <Paper key={product.id} className="cartitem">
                <h4>{product.name}</h4>
                <img src={product.imageUrl} height="220" />
                <h4>Quantity: {product.Orders[0].OrderHistory.quantity}</h4>
                <h4>
                  Price: $
                  {this.roundDecimal(
                    product.price * product.Orders[0].OrderHistory.quantity
                  )}
                </h4>
                <button
                  className="addtocart"
                  style={{
                    background: 'transparent',
                    padding: '1em'
                  }}
                  type="button"
                  value="increment"
                  onClick={() =>
                    this.props.addToUserCart(
                      product.id,
                      product.Orders[0].id,
                      userId
                    )
                  }
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
                  value="decrement"
                  onClick={() =>
                    this.props.subtractFromUserCart(
                      product.id,
                      product.Orders[0].id,
                      userId
                    )
                  }
                >
                  -
                </button>
                <div>
                  <button
                    className="addtocart"
                    type="button"
                    style={{
                      background: 'transparent',
                      padding: '1em'
                    }}
                    onClick={() =>
                      this.props.deleteProductFromUserCart(product.id, userId)
                    }
                  >
                    remove from cart
                  </button>
                </div>
              </Paper>
            ))}
            <div>
              {products === null ? (
                <div>buy some stuff</div>
              ) : (
                <div>
                  <br />
                  <div>total: ${total}</div>
                  <Link to="/orderconfirmation">
                    <button
                      className="addtocart"
                      type="submit"
                      style={{
                        background: 'transparent',
                        padding: '1em'
                      }}
                      onClick={() => this.props.userCheckout(userId)}
                    >
                      place order
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </Paper>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.userShoppingCartReducer.userCart
  }
}

const mapDispatch = dispatch => {
  return {
    loadUserShoppingCart: userId => {
      dispatch(getUserShoppingCart(userId))
    },
    addToUserCart: (productId, orderId, userId) => {
      dispatch(addingToUserCart(productId, orderId, userId))
    },
    subtractFromUserCart: (productId, orderId, userId) => {
      dispatch(subtractingFromUserCart(productId, orderId, userId))
    },
    deleteProductFromUserCart: (productId, userId) => {
      dispatch(deletingFromUserCart(productId, userId))
    },
    userCheckout: userId => {
      dispatch(userCartCheckout(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(UserShoppingCart)
