import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleproduct.js'
import {addingToShoppingCart} from '../store/guestShoppingCart'
import {addingToUserShoppingCart} from '../store/userShoppingCart'

export class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      dataLoaded: false
    }
  }

  componentDidMount() {
    if (this.props.match) {
      this.props.fetchProduct(this.props.match.params.id)
      this.setState({dataLoaded: true})
    }
  }

  render() {

    const product = this.props.product.single
    const userId = this.props.userId

    if (this.state.dataLoaded === true) {
      return (
        <header>
          <span className="single-product">
            <div> {product.name}</div>
            <img src={product.imageUrl} height="404" />
            <div>Price: {product.price}</div>
            <div>Description: {product.description}</div>
            {userId === undefined ? (
              <button
                style={{fontSize: '16px', background: 'transparent'}}
                type="submit"
                onClick={() => this.props.addProductToGuestCart(product)}
              >
                Add to cart
              </button>
            ) : (
              <button
                style={{fontSize: '16px', background: 'transparent'}}
                type="submit"
                onClick={() =>
                  this.props.addProductToUserCart(product.id, userId)
                }
              >
                Add to cart
              </button>
            )}
          </span>
        </header>
      )
    } else {
      return <div>LOADING</div>
    }
  }
}

const mapState = state => {
  return {
    product: state.productReducer,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProduct: id => dispatch(fetchProduct(id)),
    addProductToGuestCart: product => dispatch(addingToShoppingCart(product)),
    addProductToUserCart: (ProductId, UserId) =>
      dispatch(addingToUserShoppingCart(ProductId, UserId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
