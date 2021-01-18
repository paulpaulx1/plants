import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'
import {createProduct, deleteProduct} from '../store/adminDashboard'
import {Link} from 'react-router-dom'
import {setProduct} from '../store/singleProduct'
import axios from 'axios'

export class AdminDashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      price: '',
      description: '',
      imageUrl: '',
      brand: ''
    }
  }
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const {products} = this.props
    console.log('props======>', this.props)
    return (
      <header className="admin-dash">
        <span>
          {' '}
          <>PRODUCTS</>
          <>
            {products.map(product => (
              <form
                key={product.id}
                onSubmit={() => this.handleSubmit()}
                name={product.name}
              >
                <>
                  <img src={product.imageUrl} height="100" />
                  <br />

                  <>{product.name}</>
                  <label htmlFor={product.name} />
                  <small>Change Name</small>
                  <input name={product.name} type="text" />
                  <br />
                  <>{(product.price * 1).toFixed(2)}</>
                  <label htmlFor={product.price} />
                  <small>Change Price</small>
                  <input name={product.price} type="text" />
                  <br />
                  <>{product.imageUrl}</>
                  <br />

                  <small>Change Image URL</small>
                  <label htmlFor={product.imageUrl} />
                  <input name={product.imageUrl} type="text" />
                  <button
                    type="submit"
                    onClick={() => this.props.deletingProduct(product)}
                  >
                    DELETE {product.name}
                  </button>
                </>
              </form>
            ))}
          </>
          <div>ADD PRODUCT</div>
          <form>
            <label htmlFor="name" />
            <small>Name:</small>
            <input
              onChange={evt => {
                this.setState({name: evt.target.value})
              }}
              name="name"
              type="text"
              value={this.state.name}
            />
            <label htmlFor="newprice" />
            <small>Price:</small>
            <input
              onChange={evt => {
                this.setState({price: evt.target.value})
              }}
              name="price"
              type="text"
              value={this.state.price}
            />
            <label htmlFor="description" />
            <small>Description:</small>
            <input
              onChange={evt => {
                this.setState({description: evt.target.value})
              }}
              name="description"
              type="text"
              value={this.state.description}
            />
            <label htmlFor="imageUrl" />
            <small>imageUrl:</small>
            <input
              onChange={evt => {
                this.setState({imageUrl: evt.target.value})
              }}
              name="imageUrl"
              type="text"
              value={this.state.imageUrl}
            />
            <label htmlFor="brand" />
            <small>Brand:</small>
            <input
              onChange={evt => {
                this.setState({brand: evt.target.value})
              }}
              name="brand"
              type="text"
              value={this.state.brand}
            />
            <button
              type="submit"
              onClick={evt => {
                evt.preventDefault()
                this.props.creatingProduct(this.state)
                this.setState({
                  name: '',
                  price: '',
                  description: '',
                  imageUrl: '',
                  brand: ''
                })
              }}
            >
              XXXXXX
            </button>
          </form>
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
    creatingProduct: product => {
      dispatch(createProduct(product))
    },
    fetchProducts: () => dispatch(fetchProducts()),
    deletingProduct: product => {
      dispatch(deleteProduct(product))
    }
  }
}

export default connect(mapState, mapDispatch)(AdminDashboard)

// AdminDashboard.propTypes = {
//     // name: PropTypes.string.isRequired,
//     // displayName: PropTypes.string.isRequired,
//     handleSubmit: PropTypes.func.isRequired,
//     // error: PropTypes.object
//   }
