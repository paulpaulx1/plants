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
      <header className="flex-container">
        <span>
          {' '}
          <h1 className="all-h1">All Hats</h1>
          <div>
            {products.map(product => (
              <div key={product.id}>
                <Link to={`/product/${product.id}`}>
                  <h4>{product.name}</h4>
                  <h4>{(product.price * 1).toFixed(2)}</h4>
                  <img src={product.imageUrl} height="300" />
                </Link>
              </div>
            ))}
          </div>
        </span>
      </header>
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
