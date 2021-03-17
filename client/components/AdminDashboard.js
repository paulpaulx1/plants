import React from 'react'
import {connect} from 'react-redux'
import {
  adminFetchProducts,
  createProduct,
  deleteProduct,
  updateProduct
} from '../store/adminDashboard'

import {addProduct} from '../store/allProducts'

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
    this.props.adminFetchProducts()
  }

  render() {
    const {products} = this.props

    return (
      <header>
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
                  {/* <label htmlFor={product.name} /> */}
                  <button
                    type="submit"
                    onClick={evt => {
                      evt.preventDefault()
                      this.props.updatingProduct({
                        ...product,
                        name: this.state.name
                      })
                      this.setState({
                        name: '',
                        price: '',
                        description: '',
                        imageUrl: '',
                        brand: ''
                      })
                    }}
                  >
                    Change Name ===
                  </button>
                  <input
                    name={product.name}
                    type="text"
                    onChange={evt => {
                      this.setState({name: evt.target.value})
                    }}
                  />
                  <br />

                  <>{(product.price * 1).toFixed(2)}</>
                  <label htmlFor={product.price} />
                  <button
                    type="submit"
                    onClick={async evt => {
                      evt.preventDefault()
                      await this.props.updatingProduct({
                        ...product,
                        price: this.state.price
                      })
                      this.setState({
                        name: '',
                        price: '',
                        description: '',
                        imageUrl: '',
                        brand: ''
                      })
                    }}
                  >
                    Change Price ===
                  </button>
                  <input
                    name={product.price}
                    type="text"
                    onChange={evt => {
                      this.setState({price: evt.target.value})
                    }}
                  />

                  <br />
                  <>{product.imageUrl}</>
                  <br />
                  <label htmlFor={product.imageUrl} />
                  <button
                    type="submit"
                    onClick={evt => {
                      evt.preventDefault()
                      this.props.updatingProduct({
                        ...product,
                        imageUrl: this.state.imageUrl
                      })
                      this.setState({
                        name: '',
                        price: '',
                        description: '',
                        imageUrl: '',
                        brand: ''
                      })
                    }}
                  >
                    Change Image URL ===
                  </button>

                  <input
                    name={product.imageUrl}
                    type="text"
                    onChange={evt => {
                      this.setState({imageUrl: evt.target.value})
                    }}
                  />
                  <br />
                  <button
                    type="button"
                    onClick={() => this.props.deletingProduct(product)}
                  >
                    DELETE {product.name}
                  </button>
                  <br />
                  <>======================</>
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
              //   value={this.state.name}
            />
            <label htmlFor="newprice" />
            <small>Price:</small>
            <input
              onChange={evt => {
                this.setState({price: evt.target.value})
              }}
              name="price"
              type="text"
              //   value={this.state.price}
            />
            <label htmlFor="description" />
            <small>Description:</small>
            <input
              onChange={evt => {
                this.setState({description: evt.target.value})
              }}
              name="description"
              type="text"
              //   value={this.state.description}
            />
            <label htmlFor="imageUrl" />
            <small>imageUrl:</small>
            <input
              onChange={evt => {
                this.setState({imageUrl: evt.target.value})
              }}
              name="imageUrl"
              type="text"
              //   value={this.state.imageUrl}
            />
            <label htmlFor="brand" />
            <small>Brand:</small>
            <input
              onChange={evt => {
                this.setState({brand: evt.target.value})
              }}
              name="brand"
              type="text"
              //   value={this.state.brand}
            />
            <button
              type="submit"
              onClick={evt => {
                evt.preventDefault()
                this.props.creatingProduct(this.state)
                this.props.addingProduct(this.state)
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
  return {products: state.dashboardReducer.all}
}

const mapDispatch = dispatch => {
  return {
    addingProduct: product => {
      dispatch(addProduct(product))
    },
    creatingProduct: product => {
      dispatch(createProduct(product))
    },
    adminFetchProducts: () => dispatch(adminFetchProducts()),
    deletingProduct: product => {
      dispatch(deleteProduct(product))
    },
    updatingProduct: product => dispatch(updateProduct(product))
  }
}

export default connect(mapState, mapDispatch)(AdminDashboard)
