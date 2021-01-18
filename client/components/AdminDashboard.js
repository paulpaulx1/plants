import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'
import {createProduct} from '../store/adminDashboard'
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
    // this.handleSubmit = this.handleSubmit.bind(this)
    // this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.fetchProducts()
    console.log('thankk thunk thunk', this.props.creatingProduct)
  }

  //   handleSubmit(evt) {
  //     evt.preventDefault()
  //     console.log(evt.target)
  //     console.log(this.props.creatingProduct)
  //     console.log(this.props)
  //     const formName = this.state.name
  //     const price = this.state.price
  //     const email = this.state.email
  //     const description = this.state.description
  //     const imageUrl = this.state.imageUrl
  //     const brand = this.state.brand
  //     this.props.creatingProduct(formName, price, email, description, imageUrl, brand)
  //   }
  //   handleChange(evt) {
  //     this.setState({
  //       [evt.target.name]: evt.target.value
  //     })
  //   }

  render() {
    const {products} = this.props
    console.log('=============>', this.props)
    // const { name, description, brand, imageUrl, price } = this.state

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
    fetchProducts: () => dispatch(fetchProducts())
  }
}

// },
// updateProduct: () => {
//   dispatch(updateProduct())
// },

const productCreator = product => async dispatch => {
  let res
  try {
    res = await axios.post(`/api/products`, product)
    dispatch(setProduct(res.data))
  } catch (error) {
    return error
  }
}

export default connect(mapState, mapDispatch)(AdminDashboard)

// AdminDashboard.propTypes = {
//     // name: PropTypes.string.isRequired,
//     // displayName: PropTypes.string.isRequired,
//     handleSubmit: PropTypes.func.isRequired,
//     // error: PropTypes.object
//   }
