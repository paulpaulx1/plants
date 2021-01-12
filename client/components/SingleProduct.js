import React, {Component} from 'react'
import axios from 'axios'

export class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      dataloaded: false
    }
  }

  //this should be handled by redux store?
  //   fetchProduct = async () => {
  //       //make an api request to the database to load this individual product
  //   }

  addProductToCart = async () => {
    //this will put 1 of the item into our shopping cart
  }

  componentDidMount = async () => {
    // if (this.props.match) {
    //   await this.fetchProduct(this.props.match.params.id);
    //   await this.setState({ dataLoaded: true, product: this.props.product });
    // }
  }
}

const mapState = state => {
  return {
    product: state.product
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProduct: id => dispatch(fetchProduct(id))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
