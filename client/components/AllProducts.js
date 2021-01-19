import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts, filterByValue} from '../store/allProducts'
import {Link} from 'react-router-dom'

export class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
    this.handleKey = this.handleKey.bind(this)
    this.filterProducts = this.filterProducts.bind(this)
  }
  componentDidMount() {
    this.props.fetchProducts()
  }

  handleKey(evt) {
    if (evt.key === 'Enter') {
      this.props.filterProducts(this.state.input)
      this.setState({input: ''})
    }
  }

  filterProducts = input => {
    console.log('FILTER INPUT ------->', input)

    let value = input
    console.log('PRODUCTS', this.props.products)
    let filteredValues = this.props.products.filter(product => {
      return (
        product.name.toLowerCase().includes(value) ||
        product.brand.toLowerCase().includes(value)
      )
    })
    console.log('FILTERED VALUE ------->', filteredValues)
    this.props.filter(filteredValues)
  }

  render() {
    console.log('THIS.PROPS', this.props.products)
    // console.log('THIS.STATE', this.state)
    const {products} = this.props
    return (
      <header className="flex-container">
        <span>
          {' '}
          <h1 className="all-h1">All Hats</h1>
          <div>
            <div className="field is-grouped" style={{alignItems: 'center'}}>
              <div className="control">
                <div className="select">
                  <select>
                    <option value="">Sort by</option>
                    <option>Price - Lowest to Highest</option>
                    <option>Price - Highest to Lowest</option>
                    <option>Alphabet - A-Z</option>
                    <option>Alphabet - Z-A</option>
                  </select>
                </div>
              </div>

              <div className="control" style={{minWidth: '300px'}}>
                <input
                  type="text"
                  value={this.state.input}
                  onChange={evt => {
                    // console.log(evt.target.value)
                    this.setState({input: evt.target.value})
                  }}
                  onKeyDown={this.handleKey}
                  style={{width: '100%'}}
                  placeholder="Filter by"
                />
                <button
                  type="button"
                  onClick={() => {
                    // console.log('TEST----->', this.state.input)
                    this.filterProducts(this.state.input)
                    this.setState({input: ''})
                  }}
                >
                  Filter
                </button>
                <button
                  type="button"
                  onClick={() => {
                    // console.log('TEST----->', this.state.input)
                    this.props.fetchProducts()
                    this.setState({input: ''})
                  }}
                >
                  RESET
                </button>
              </div>
            </div>
          </div>
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
    },
    filter: value => {
      dispatch(filterByValue(value))
    }
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
