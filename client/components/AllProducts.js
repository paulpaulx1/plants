import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'
import {Link} from 'react-router-dom'

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const {products} = this.props
    return (
      <div>
        <h1>All Products</h1>

        {products.map(product => (
          <div key={product.id}>
            <Link to={`/product/${product.id}`}>
              <h4>{product.name}</h4>
              <img src={product.imageUrl} />
            </Link>
          </div>
        ))}
      </div>
    )
  }
}
const mapState = state => {
  return {products: state.allProductsReducer.all}
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => {
      dispatch(fetchProducts())
    }
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
