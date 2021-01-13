import React from 'react'
// import axios from 'axios'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleproduct.js'

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
      this.setState({dataLoaded: true, product: this.props.product})
    }
  }

  render() {
    console.log('props------->', this.props)
    if (this.state.dataLoaded === true) {
      const product = this.props.product.single
      return (
        <div>
          <div>{product.name}</div>
          <img src={product.imageUrl} />
          <div>Price: {product.price}</div>
          <div>Description: {product.description}</div>
          <button type="button" onClick={this.addProductToCart}>
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
  console.log('state------>', state)
  return {
    product: state.productReducer
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProduct: id => dispatch(fetchProduct(id))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
