import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleproduct.js'
import {addingToShoppingCart} from '../store/guestShoppingCart'

export class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      dataLoaded: false
    }
  }

  addProductToCart = async () => {
    //this will put 1 of the item into our shopping cart
  }

  componentDidMount() {
    if (this.props.match) {
      this.props.fetchProduct(this.props.match.params.id)
      this.setState({dataLoaded: true})
    }
  }

  render() {
    if (this.state.dataLoaded === true) {
      const product = this.props.product.single
      console.log(product)
      return (
        <div>
          <div>{product.name}</div>
          <img src={product.imageUrl} />
          <div>Price: {product.price}</div>
          <div>Description: {product.description}</div>
          <button
            type="submit"
            onClick={() => this.props.addProductToGuestCart(product)}
          >
            Add to cart
          </button>
        </div>
      )
    } else {
      return <div>LOADING</div>
    }
  }
}

const mapState = state => {
  return {
    product: state.productReducer
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProduct: id => dispatch(fetchProduct(id)),
    addProductToGuestCart: product => dispatch(addingToShoppingCart(product))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
