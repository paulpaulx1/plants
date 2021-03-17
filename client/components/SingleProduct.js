import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleproduct.js'
import {addingToShoppingCart} from '../store/guestShoppingCart'
import {addingToUserShoppingCart} from '../store/userShoppingCart'
import Paper from '@material-ui/core/Paper'

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
    const product = this.props.product.single
    const userId = this.props.userId

    if (this.state.dataLoaded === true) {
      return (
        <Paper
          style={{
            textAlign: 'center',
            padding: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            alignText: 'center'
          }}
        >
          <Paper style={{padding: 5}}>
            {' '}
            <img
              style={{borderRadius: 5}}
              src={product.imageUrl}
              height="320"
            />
          </Paper>
          <div
            style={{
              maxWidth: '250px',
              marginBottom: 'auto',
              marginLeft: 40
            }}
          >
            <h3 style={{marginTop: 40, color: '#3d3d3d'}}>{product.name}</h3>
            <h3 style={{color: '#3d3d3d'}}>{product.price}</h3>
            {/* <br /> */}
            <div style={{marginBottom: '20px'}}>
              <h3 style={{color: '#3d3d3d'}}>{product.description}</h3>
            </div>
            <br />{' '}
            {userId === undefined ? (
              <button
                className="addtocart"
                type="submit"
                onClick={() => this.props.addProductToGuestCart(product)}
                style={{
                  background: 'transparent',
                  padding: '1em'
                }}
              >
                add to cart
              </button>
            ) : (
              <button
                className="addtocart"
                type="submit"
                onClick={() =>
                  this.props.addProductToUserCart(product.id, userId)
                }
                style={{background: 'transparent', padding: '1em'}}
              >
                add to cart
              </button>
            )}{' '}
          </div>
          <br />
        </Paper>
      )
    } else {
      return <div>LOADING</div>
    }
  }
}

const mapState = state => {
  return {
    product: state.productReducer,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProduct: id => dispatch(fetchProduct(id)),
    addProductToGuestCart: product => dispatch(addingToShoppingCart(product)),
    addProductToUserCart: (ProductId, UserId) =>
      dispatch(addingToUserShoppingCart(ProductId, UserId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
