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
        <header>
          <span className="single-product">
            <img src={product.imageUrl} height="300" />
            <div className="single-column">
              <div> {product.name}</div>
              <div id="singleprice">${product.price}</div>
              <div>{product.description}</div>
            </div>
            <button
              style={{fontSize: '16px', background: 'transparent'}}
              type="submit"
              onClick={() => this.props.addProductToGuestCart(product)}
            >
              Add to cart
            </button>
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
