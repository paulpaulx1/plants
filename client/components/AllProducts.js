import React from 'react'
import {connect} from 'react-redux'
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

        {products.all.map(product => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
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
  return {products: state.products}
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    deleteProduct: product => dispatch(deleteProduct(product))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
