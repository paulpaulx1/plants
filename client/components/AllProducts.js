import React from 'react'
import {connect} from 'react-redux'
import {
  fetchProducts,
  filterByValue,
  sortByAlphabet,
  sortByPrice
} from '../store/allProducts'
import {Link} from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import MediaCard from './SingleCard'
export class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
    this.handleKey = this.handleKey.bind(this)
    this.filterProducts = this.filterProducts.bind(this)
    this.sortProducts = this.sortProducts.bind(this)
    this.sortAsc = this.sortAsc.bind(this)
    this.sortDesc = this.sortDesc.bind(this)
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
    input = input.toLowerCase()
    let filteredValues = this.props.products.filter(product => {
      return (
        product.name.toLowerCase().includes(input) ||
        product.brand.toLowerCase().includes(input)
      )
    })
    this.props.filter(filteredValues)
  }

  sortProducts(e) {
    let value = e.target.value
    let direction = value.endsWith('asc') ? 'asc' : 'desc'

    if (value.startsWith('price')) {
      let sortedPriceProducts =
        direction === 'asc'
          ? this.props.products.slice(0).sort((a, b) => a.price - b.price)
          : this.props.products.slice(0).sort((a, b) => b.price - a.price)
      this.props.priceSort(sortedPriceProducts)
    } else {
      let sortedPriceProducts =
        direction === 'asc'
          ? this.sortAsc(this.props.products, 'name')
          : this.sortDesc(this.props.products, 'name')
      this.props.alphaSort(sortedPriceProducts)
    }
  }

  sortAsc = (arr, field) => {
    return arr.slice(0).sort(function(a, b) {
      if (a[field] > b[field]) return 1

      if (b[field] > a[field]) return -1

      return 0
    })
  }

  sortDesc = (arr, field) => {
    return arr.slice(0).sort(function(a, b) {
      if (a[field] > b[field]) return -1

      if (b[field] > a[field]) return 1

      return 0
    })
  }

  render() {
    console.log(MediaCard)
    const {products} = this.props
    return (
      <Paper>
        <header>
          <span>
            {' '}
            <div style={{textAlign: 'center'}}>
              <h1 id="shopcart">all plants</h1>
            </div>
            <Paper>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  textAlign: 'center',
                  alignItems: 'center'
                }}
              >
                <select
                  className="searchfilter"
                  defaultValue="default"
                  onChange={e => {
                    this.sortProducts(e)
                  }}
                >
                  <option value="default" disabled>
                    Sort by
                  </option>

                  <option value="alphabet_asc">Name - A-Z</option>
                  <option value="alphabet_desc">Name - Z-A</option>

                  <option value="price_asc">Price - Lowest to Highest</option>
                  <option value="price_desc">Price - Highest to Lowest</option>
                </select>

                {/* <div style={{maxWidth: '300px'}}> */}
                <input
                  className="searchfilter"
                  type="text"
                  value={this.state.input}
                  onChange={evt => {
                    this.setState({input: evt.target.value})
                  }}
                  onKeyDown={this.handleKey}
                  style={{width: '400px', marginLeft: '10px'}}
                  placeholder="Filter by"
                />
                <button
                  style={{
                    background: 'transparent',
                    padding: '.2em',
                    margin: '8px',
                    border: '1px solid #b4b4b4'
                  }}
                  className="searchfilter"
                  type="button"
                  onClick={() => {
                    this.filterProducts(this.state.input)
                    this.setState({input: ''})
                  }}
                >
                  filter
                </button>

                <button
                  style={{
                    background: 'transparent',
                    padding: '.2em',
                    margin: '.2em',
                    border: '1px solid #b4b4b4'
                  }}
                  className="searchfilter"
                  type="button"
                  onClick={() => {
                    this.props.fetchProducts()
                    this.setState({input: ''})
                  }}
                >
                  reset
                </button>
              </div>

              {/* </div> */}
            </Paper>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 20
              }}
            >
              {products.map(product => (
                <MediaCard
                  product={product}
                  key={product.id}
                  price={(product.price * 1).toFixed(2)}
                  name={product.name}
                  description={product.description}
                  url={product.imageUrl}
                />
                // <Paper key={product.id}>
                // <div>
                //   <Link to={`/product/${product.id}`}>
                //     <h4 id="allproducttext">{product.name}</h4>
                //     <h4 id="allproducttext">{(product.price * 1).toFixed(2)}</h4>
                //     <img src={product.imageUrl} height="250" />
                //   </Link>
                // </div></Paper>
              ))}
            </div>
          </span>
        </header>
      </Paper>
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
    },
    priceSort: value => {
      dispatch(sortByPrice(value))
    },
    alphaSort: value => {
      dispatch(sortByAlphabet(value))
    }
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
