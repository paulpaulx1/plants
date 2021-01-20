import React from 'react'
import {connect} from 'react-redux'
import dateFormat from 'dateformat'
import {getOrderHistory} from '../store/orderHistory'

class OrderHistory extends React.Component {
  componentDidMount() {
    this.props.fetchOrderHistory(this.props.match.params.id)
  }

  render() {
    const orderHistory = this.props.history
    //HIIII
    return (
      <div>
        <h1>Order History</h1>
        <div>
          {orderHistory.length === 0 ? (
            <div>You Have Not Purchased Any Of Our Crazy Vito's Hats!</div>
          ) : (
            <div>
              {orderHistory.map(order => {
                return (
                  <div key={order.id}>
                    <br />
                    <br />
                    <div>
                      Purchase Date: {dateFormat(order.updatedAt, 'fullDate')}
                    </div>
                    <div>
                      {order.Products.map(product => {
                        return (
                          <div key={product.id}>
                            <div>Name: {product.name}</div>
                            <div>Price: ${product.price}</div>
                            <div>Quantity: {product.OrderHistory.quantity}</div>
                            <img src={product.imageUrl} height="300" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    history: state.orderHistoryReducer.history
  }
}

const mapDispatch = dispatch => {
  return {
    fetchOrderHistory: id => {
      dispatch(getOrderHistory(id))
    }
  }
}

export default connect(mapState, mapDispatch)(OrderHistory)
